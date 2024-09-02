<template>
  <div>
    <h2>자유게시판 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />
    <PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="save">
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
import PostForm from '@/components/posts/PostForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert';
//import { createFboard } from '@/api/posts';

const { vAlert, vSuccess } = useAlert();

const form = ref({
  title: null,
  content: null,
});

// 글등록
const { error, loading, execute } = useAxios(
  '/fboard',
  {
    method: 'post',
  },
  {
    immediate: false,
    onSuccess: () => {
      router.push({ name: 'FboardList' });
      vSuccess('등록이 완료되었습니다!🐰');
    },
    onError: (err) => {
      vAlert(err.message);
      error.value = err;
    },
  },
);

const save = async () => {
  execute({ ...form.value, createdAt: Date.now(), hit: 0 });
};

const router = useRouter();
const goListPage = () => {
  router.push({ name: 'FboardList' });
};
</script>

<style scoped></style>
