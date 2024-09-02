<template>
  <table class="table table-hover">
    <thead class="table-dark">
      <tr>
        <th scope="col" class="table-no">번호</th>
        <th scope="col" class="table-title">제목</th>
        <th scope="col" class="table-content">내용</th>
        <th scope="col" class="table-createdAt">등록일</th>
        <th scope="col" class="table-hit">조회수</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="item.id" @click="handelItemClick(item)">
        <slot :item="item" :index="index">
          <th scope="row">{{ item.id }}</th>
          <td class="td-title">{{ item.title }}</td>
          <td class="td-content">{{ item.content }}</td>
          <td class="td-createdAt">{{ formatDate(item.createdAt) }}</td>
          <td class="td-hit">{{ item.hit }}</td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from 'vue';
import dayjs from 'dayjs'; // dayjs 직접 import
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

// 날짜 포맷팅 함수
function formatDate(date) {
  return dayjs(date).format('YYYY. MM. DD HH:mm:ss');
}

const handelItemClick = async (item) => {
  // 조회수 증가 서버에 요청
  await axios.patch(`http://localhost:5001/fboard/${item.id}`, {
    hit: (item.hit += 1),
  });

  console.log('hit :', item.hit);
  // 상세 페이지 이동
  router.push({ name: 'FboardDetail', params: { id: item.id } });
};
</script>

<style scoped>
.table {
  table-layout: fixed;
}
.table-no {
  width: 50px;
}

.table-title {
  max-width: 300px;
}

.table-content {
  max-width: 400px;
}

.table-createdAt {
  max-width: 200px;
}

.table-title,
.table-content,
.table-createdAt,
.table-hit {
  text-align: center;
}

.td-createdAt,
.td-hit {
  text-align: center;
}

.td-title,
.td-content,
.td-createdAt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
