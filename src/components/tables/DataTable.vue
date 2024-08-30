<template>
  <table class="table table-hover">
    <thead class="table-dark">
      <tr>
        <th scope="col" class="table-no">번호</th>
        <th scope="col" class="table-title">제목</th>
        <th scope="col" class="table-content">내용</th>
        <th scope="col" class="table-createdAt">등록일</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index" @click="goDetailPage(item)">
        <slot :item="item" :index="index">
          <th scope="row">{{ item.id }}</th>
          <td class="td-title">{{ item.title }}</td>
          <td class="td-content">{{ item.content }}</td>
          <td class="td-createdAt">{{ formatDate(item.createdAt) }}</td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from 'vue';
import dayjs from 'dayjs'; // dayjs 직접 import
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
console.log('props: ', props);

// 날짜 포맷팅 함수
function formatDate(date) {
  return dayjs(date).format('YYYY. MM. DD HH:mm:ss');
}

const goDetailPage = (item) => {
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
.table-createdAt {
  text-align: center;
}

.td-createdAt {
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
