<template>
  <div>
    <div class="board-title">
      <h2>자유게시판 목록</h2>
      <button type="button" class="btn btn-success d-block" @click="goCreatePost">글쓰기</button>
    </div>
    <hr class="mt-4 mb-4" />

    <PostFilter
      v-model:title="params.title_like"
      :limit="params._limit"
      @update:limit="changeLimit"
      :selectOptions="selectOptions"
    />

    <hr class="my-4" />

    <AppLoading v-if="loading" />
    <AppError v-else-if="error" :message="error.message" />

    <DataTable :items="fboard"> </DataTable>

    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="
        (page) => {
          params._page = page;
        }
      "
    />
  </div>
</template>

<script setup>
import PostFilter from '@/components/posts/PostFilter.vue';
import DataTable from '@/components/tables/DataTable.vue';
import AppPagination from '@/components/app/AppPagination.vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { computed, ref } from 'vue';

// pagination
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 10,
  title_like: '',
});

const changeLimit = (value) => {
  params.value._limit = value;
  params.value._page = 1;
};

// 게시판 목록 불러오기
const { response, data: fboard, error, loading } = useAxios('/fboard', { params });

const totalCount = computed(() => response.value?.headers?.['x-total-count'] || 0);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit));

const router = useRouter();
// 글등록 페이지 이동
const goCreatePost = () => {
  router.push({
    name: 'FboardCreate',
  });
};

// selectOptions 정의
const selectOptions = [
  { value: '10', label: '10개씩 보기' },
  { value: '15', label: '15개씩 보기' },
  { value: '20', label: '20개씩 보기' },
];
</script>

<style scoped>
.board-title {
  display: flex;
  justify-content: space-between;
}
.board-title button {
  background-color: #0084ff;
  border: 1px solid #0177e6;
}

.board-title button:hover {
  background-color: #4356ff;
  border: 1px solid #1351fd;
}
</style>
