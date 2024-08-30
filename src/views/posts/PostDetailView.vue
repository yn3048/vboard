<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2 class="mb-5">{{ post.title }}</h2>
    <p>id : {{ props.id }}, idOdd: {{ isOdd }}</p>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ $dayjs(post.createdAt).format('YYYY. MM. DD HH:mm:ss') }}</p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="$router.push('/posts/19')">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="$router.push('/posts/20')">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove" :disabled="removeLoading">
          <template v-if="removeLoading">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else> 삭제 </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';
import { computed, toRefs } from 'vue';
import { useNumber } from '@/composables/number';

const props = defineProps({
  id: [String, Number],
});

const router = useRouter();
//const idRef = toRef(props, 'id');
const { id: idRef } = toRefs(props);
const { isOdd } = useNumber(idRef);
const { vAlert, vSuccess } = useAlert();
const url = computed(() => `/posts/${props.id}`);
const { error, loading, data: post } = useAxios(url);

// 삭제
const {
  error: removeError,
  loading: removeLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다!');
      router.push({ name: 'PostList' });
    },
    onError: (err) => {
      removeError.value = err;
      vAlert(error.value.message);
    },
  },
);

const remove = async () => {
  if (confirm('정말 삭제 하시겠습니까?') === false) {
    return;
  }
  execute();
};

const goListPage = () => {
  router.push({
    name: 'PostList',
  });
};
const goEditPage = () => {
  router.push({
    name: 'PostEdit',
    params: { id: props.id },
  });
};

onBeforeRouteUpdate(() => {
  console.log('onBeforeRouteUpdate');
});
onBeforeRouteLeave(() => {
  console.log('onBeforeRouteLeave');
});
</script>

<script>
// beforeRouteEnter() 함수는 setup 함수보다 먼저 실행되기 때문에 optionsAPI를 사용
export default {
  beforeRouteEnter() {
    console.log('beforeRouteEnter');
  },
};
</script>

<style lang="scss" scoped></style>
