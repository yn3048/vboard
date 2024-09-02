<template>
  <div>
    <h2>Home View</h2>
    <hr class="my-4" />
    <p>path: {{ $route.path }}</p>
    <p>route name: {{ $route.name }}</p>
    <button type="button" class="btn btn-primary mt-5" @click="goAboutPage">About으로 이동</button>
    <hr class="my-4" />
    <AppGrid :items="items" v-slot="{ item }" col-class="col-3">
      <AppCard @click="toggleShow(item)">
        {{ item }}
        <!-- 선택된 아이템 표시 -->
        <img v-if="selectedItem === item" :src="getImgUrl(item)" alt="" class="img-fluid mt-2" />
      </AppCard>
    </AppGrid>
    <h2 class="mt-5">{{ position }}</h2>
    <h2>x: {{ x }}</h2>
    <h2>y: {{ y }}</h2>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$person.name);
    // this.$person.say();
  },
};
</script>

<script setup>
import { reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

import appleImg from '@/assets/img/apple.jpg';
import strawberryImg from '@/assets/img/strawberry.jpg';
import blueberryImg from '@/assets/img/blueberry.jpg';
import bananaImg from '@/assets/img/banana.jpg';

const router = useRouter();
const goAboutPage = () => {
  router.push('/about');
};

const items = ref(['사과', '딸기', '블루베리', '바나나']);

// 선택된 아이템 추적
const selectedItem = ref(null);

// 이미지 토글
const toggleShow = (item) => {
  if (selectedItem.value === item) {
    console.log(item);
    // 클릭된 이미지가 이미 존재할 경우 선택 해제
    selectedItem.value = null;
  } else {
    // 클릭된 아이템을 선택
    selectedItem.value = item;
  }
};

// 선택된 item 이미지 url 가져오는 함수
const getImgUrl = (item) => {
  const imgMap = {
    사과: appleImg,
    딸기: strawberryImg,
    블루베리: blueberryImg,
    바나나: bananaImg,
  };
  return imgMap[item];
};

const position = reactive({
  x: 100,
  y: 1000,
});

/**
 * ✨toRef() 함수 : 하나씩 가져올 때 사용
 * ✨toRefs() 함수 : 구조분해 할당을 통해 여러개 가져올 때 사용
 * */
// const x = toRef(position, 'x');
// const y = toRef(position, 'y');
const { x, y } = toRefs(position);
</script>

<style scoped></style>
