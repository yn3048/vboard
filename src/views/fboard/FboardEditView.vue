<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message"></AppError>

  <div v-else>
    <h2>자유게시판 글수정</h2>
    <hr />
    <AppError v-if="editError" :message="editError.message" />
    <PostForm
      v-else
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="edit"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">
          취소
        </button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else> 수정 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import PostForm from '@/components/posts/PostForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert';

const { vAlert, vSuccess } = useAlert();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { error, loading, data: form } = useAxios(`/fboard/${id}`);

const {
  error: editError,
  loading: editLoading,
  execute,
} = useAxios(
  `fboard/${id}`,
  { method: 'patch' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('수정이 완료되었습니다!🐰');
      router.push({ name: 'FboardDetail', params: { id } });
    },
    onError: (error) => {
      vAlert(error.value.message);
    },
  },
);

const edit = () => {
  execute({
    ...form.value,
  });
};

const goDetailPage = () => {
  router.push({
    name: 'FboardDetail',
    params: { id },
  });
};
</script>

<style lang="scss" scoped></style>
