<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <div>
      <h3 class="mb-5">{{ fboard.title }}</h3>
      <p>id: {{ props.id }}</p>
      <p>{{ fboard.content }}</p>
      <p>{{ $dayjs(fboard.createdAt).format('YYYY. MM. DD HH:mm:ss') }}</p>
      <hr class="my-4" />
      <AppError v-if="removeError" :message="removeError.message" />
    </div>
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
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
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';
import { computed } from 'vue';

const props = defineProps({
  id: [String, Number],
});
const router = useRouter();
const { vAlert, vSuccess } = useAlert();
const url = computed(() => `/fboard/${props.id}`);
const { error, loading, data: fboard } = useAxios(url);

// 삭제
const {
  loading: removeLoading,
  error: removeError,
  execute,
} = useAxios(
  `/fboard/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다!');
      router.push({ name: 'FboardList' });
    },
    onError: (err) => {
      removeError.value = err;
      vAlert(err.value.message);
    },
  },
);

const remove = async () => {
  if (confirm('정말 삭제 하시겠습니까?') === false) {
    return;
  }
  execute();
};

// 목록페이지 이동
const goListPage = () => {
  router.push({ name: 'FboardList' });
};

// 수정페이지 이동
const goEditPage = () => {
  router.push({
    name: 'FboardEdit',
    params: { id: props.id },
  });
};
</script>

<style lang="scss" scoped></style>
