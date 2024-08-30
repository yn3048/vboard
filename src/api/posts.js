// . => 해당 디렉토리에 있는 js 파일 가져옴
import { posts, fboard } from '.';

// 글목록 조회
export function getPosts(params) {
  return posts.get('/', { params });
}

// 글 상세보기
export function getPostById(id) {
  return posts.get(`/${id}`);
}

// 글등록
export function createPost(data) {
  return posts.post('', data);
}

// 글수정
// export function updatePost(id, data) {
//   return posts.put(`/${id}`, data);
// }
export function updatePost(id, data) {
  return posts.patch(`/${id}`, data);
}

// 글삭제
export function deletePost(id) {
  return posts.delete(`/${id}`);
}

//🐰자유게시판🐰//

// 글목록 조회
export function getFboard() {
  return fboard.get('/');
}

// 글 상세보기
export function getFboardById(id) {
  return fboard.get(`/${id}`);
}

// 글등록
export function createFboard(data) {
  return fboard.post('', data);
}

// 글수정
export function updateFboard(id, data) {
  return posts.patch(`/${id}`, data);
}

// 글삭제
export function deleteFboard(id) {
  return posts.delete(`/${id}`);
}
