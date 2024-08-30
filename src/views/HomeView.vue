<template>
  <div>
    <h2>Home View</h2>
    <hr class="my-4" />
    <p>path: {{ $route.path }}</p>
    <p>route name: {{ $route.name }}</p>
    <button type="button" class="btn btn-primary mt-5" @click="goAboutPage">About으로 이동</button>
    <hr class="my-4" />
    <AppGrid :items="items" v-slot="{ item }" col-class="col-3">
      <AppCard>{{ item }}</AppCard>
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
import { reactive, ref, toRef, toRefs } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
  router.push('/about');
};

const items = ref(['사과', '딸기', '포도', '바나나']);

const position = reactive({
  x: 100,
  y: 1000,
});

//const x = position.x;
//const { x, y } = position;
// const x = ref(position.x);
// const y = ref(position.y);
// console.log('x: ', typeof x.value);
// console.log('y: ', typeof y.value);

/**
 * ✨toRef() 함수 : 하나씩 가져올 때 사용
 * ✨toRefs() 함수 : 구조분해 할당을 통해 여러개 가져올 때 사용
 * */
// const x = toRef(position, 'x');
// const y = toRef(position, 'y');
const { x, y } = toRefs(position);
</script>

<style scoped></style>
