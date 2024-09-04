<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <div>
      <h3 class="mb-5">{{ fboard.title }}</h3>
      <p class="hit-num">조회수: {{ fboard.hit }}</p>
      <p>id: {{ props.id }}</p>
      <p>{{ fboard.content }}</p>
      <p>{{ $dayjs(fboard.createdAt).format('YYYY. MM. DD HH:mm:ss') }}</p>
      <hr class="my-4" />
      <AppError v-if="removeError" :message="removeError.message" />
    </div>

    <div class="row g-2 mt-5 pb-5">
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
    <!-- 댓글 등록 -->
    <PostCommentForm class="mt-5" v-model:content="commentForm.content" @submit.prevent="save">
      <template #actions>
        <button class="btn btn-secondary">등록</button>
      </template>
    </PostCommentForm>

    <!-- 댓글 목록 -->
    <div class="mt-4">
      <h5>댓글 목록</h5>

      <div v-if="commentList.length === 0">댓글이 없습니다.</div>

      <div class="mb-3" v-for="comment in commentList" :key="comment.id">
        <div class="d-flex comment-btn">
          <p class="form-label">
            {{ $dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          </p>
          <div class="mb-1">
            <button
              class="btn btn-primary me-2"
              @click="editComment(comment)"
              v-if="!comment.isEditing"
            >
              수정
            </button>
            <button
              class="btn btn-outline-dark me-2"
              @click="saveComment(comment)"
              v-if="comment.isEditing"
            >
              저장
            </button>
            <button class="btn btn-danger" @click="cancelEdit(comment)" v-if="comment.isEditing">
              취소
            </button>
            <button
              class="btn btn-danger"
              @click="removeComment(comment.id)"
              v-if="!comment.isEditing"
            >
              삭제
            </button>
          </div>
        </div>
        <textarea
          v-model="comment.content"
          class="form-control commentArea"
          rows="3"
          :readonly="!comment.isEditing"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import PostCommentForm from '@/components/posts/PostCommentForm.vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  id: [String, Number],
});
const router = useRouter();
const { vAlert, vSuccess } = useAlert();
const url = computed(() => `/fboard/${props.id}`);
const { error, loading, data: fboard } = useAxios(url);

// 컴포넌트가 마운트 될 때 댓글 불러오기 함수 실행
onMounted(() => {
  fetchComments();
});

// 글 삭제
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

///////////////////✨댓글✨///////////////////////////

// 댓글목록 상태
const commentList = ref([]);
// 댓글 폼 상태
const commentForm = ref({
  content: null,
  postId: props.id,
});

// 댓글 조회 URL
const commentUrl = computed(() => `/comments?postId=${props.id}`);
// 댓글 조회 함수
const fetchComments = async () => {
  const { data } = await axios.get(commentUrl.value);
  commentList.value = data;
};

// 댓글 등록
const save = async () => {
  saveExecute({ ...commentForm.value, createdAt: Date.now() });
  console.log(commentForm.value);
};

const { execute: saveExecute } = useAxios(
  '/comments',
  {
    method: 'post',
  },
  {
    immediate: false,
    onSuccess: (newComment) => {
      commentList.value.push(newComment); // 새 댓글추가
      commentForm.value.content = null; // 폼 초기화
      vSuccess('등록이 완료되었습니다!😝');
      console.log('newComment: ', newComment);
      // 댓글 조회 함수 실행
      fetchComments();
    },
  },
);

// 댓글 수정
const updateComment = async (comment) => {
  try {
    await axios.patch(`/comments/${comment.id}`, { content: comment.content });
    vSuccess('댓글이 수정되었습니다!');
    fetchComments();
  } catch (error) {
    vAlert('댓글 수정에 실패하였습니다.');
  }
};

const saveComment = async (comment) => {
  await updateComment(comment);
  comment.isEditing = false;
};

const editComment = (comment) => {
  comment.isEditing = true;
};

const cancelEdit = (comment) => {
  comment.isEditing = false;
};

// 댓글 삭제
const deleteCommentApi = async (commentId) => {
  console.log('선택된 commentId : ', commentId);
  return axios.delete(`/comments/${commentId}`);
};

// 댓글 상태 업데이트 함수
const updateCommentList = (commentId) => {
  commentList.value = commentList.value.filter((comment) => comment.id !== commentId);
  console.log('지워진 commentId: ', commentId);
};

const removeComment = async (commentId) => {
  if (confirm('정말 삭제하시겠습니까?') === false) {
    return;
  }

  try {
    await deleteCommentApi(commentId);
    vSuccess('댓글이 삭제되었습니다!');
    updateCommentList(commentId);
  } catch (error) {
    vAlert('댓글 삭제에 실패했습니다.');
  }
};
</script>

<style>
.hit-num {
  color: #3e51ff;
  font-weight: bold;
}

.comment-btn {
  justify-content: space-between;
}
</style>
