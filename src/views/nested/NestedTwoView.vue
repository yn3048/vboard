<template>
  <div class="card">
    <div class="card-header">Nested Two</div>
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">
        With supporting text below as a natural lead-in to additional content.
      </p>
      <router-link to="/about" class="btn btn-warning" @click="goAboutPage"
        >Go About Page</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
  router.push({
    name: 'About',
  });
};
</script>

<style lang="scss" scoped></style>
