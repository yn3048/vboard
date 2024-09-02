<template>
  <div>
    <div class="board-title">
      <h2>게시글 목록</h2>
      <button type="button" class="btn btn-success d-block" @click="goCreatePost">글쓰기</button>
    </div>
    <hr class="my-4" />

    <PostFilter
      v-model:title="params.title_like"
      :limit="params._limit"
      @update:limit="changeLimit"
      :selectOptions="selectOptions"
    />

    <hr class="my-4" />

    <AppLoading v-if="loading" />

    <AppError v-else-if="error" :message="error.message" />

    <template v-else-if="!isExist">
      <p class="text-center py-5 text-muted">No Results😥</p>
    </template>

    <template v-else>
      <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :createdAt="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
          ></PostItem>
        </template>
      </AppGrid>

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="
          (page) => {
            params._page = page;
          }
        "
      />
    </template>

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createdAt="modalCreatedAt"
      />
    </Teleport>

    <template v-if="previewId">
      <hr class="my-5" />
      <AppCard>
        <post-detail-view :id="previewId"></post-detail-view>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';

import PostModal from '@/components/posts/PostModal.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import { computed, ref } from 'vue';
import { useAxios } from '@/hooks/useAxios';

const previewId = ref(null);
const selectPreview = (id) => (previewId.value = id);

// 🎈pagination
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 6,
  title_like: '',
});

const changeLimit = (value) => {
  params.value._limit = value;
  params.value._page = 1;
};

const { response, data: posts, error, loading } = useAxios('/posts', { params });
const isExist = computed(() => posts.value && posts.value.length > 0);

const router = useRouter();

const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit));

// 글등록 페이지
const goCreatePost = () => {
  router.push({
    name: 'PostCreate',
  });
};
// 글 상세보기 페이지
const goPage = (id) => {
  // router.push(`/posts/${id}`);
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};

// modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');

const openModal = ({ title, content, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
};

// selectOptions 정의
const selectOptions = [
  { value: '6', label: '6개씩 보기' },
  { value: '12', label: '12개씩 보기' },
  { value: '18', label: '18개씩 보기' },
];
</script>

<style scoped>
.board-title {
  display: flex;
  justify-content: space-between;
}
.board-title button:hover {
  background-color: rgb(1, 99, 34);
}
</style>
