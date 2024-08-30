<template>
  <div>
    <h2>About View</h2>
    <hr class="my-4" />
    <p>path: {{ $route.path }}</p>
    <p>path name: {{ $route.name }}</p>
    <button type="button" class="btn btn-primary mt-5" @click="goHomePage">Home으로 이동</button>
    <h2 class="mt-4">Store</h2>
    <p>counter: {{ counter }}</p>
    <p>counter2: {{ counter }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <p>doubleCountPlusOne: {{ doubleCountPlusOne }}</p>
    <button class="btn btn-warning" @click="increment()">Click!!</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const router = useRouter();
const goHomePage = () => {
  router.push('/');
};

const store = useCounterStore();
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
const { increment } = store;
counter.value = 100;
// increment();
// increment();
// increment();
</script>

<style scoped></style>
