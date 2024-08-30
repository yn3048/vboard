<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />
    <PostForm
      v-if="visibleForm"
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>

        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else> 저장 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vSuccess } = useAlert();

const form = ref({
  title: null,
  content: null,
});

const { error, loading, execute } = useAxios(
  '/posts',
  {
    method: 'post',
  },
  {
    immediate: false,
    onSuccess: () => {
      router.push({ name: 'PostList' });
      vSuccess('등록이 완료되었습니다!🐰');
    },
    onError: (err) => {
      vAlert(err.message);
      error.value = err;
    },
  },
);
const save = async () => {
  execute({ ...form.value, createdAt: Date.now() });
};

const router = useRouter();
const goListPage = () => {
  router.push({
    name: 'PostList',
  });
};
const visibleForm = ref(true);
</script>

<style scoped></style>
