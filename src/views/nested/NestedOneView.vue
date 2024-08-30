<template>
  <div class="card">
    <div class="card-header">Nested One</div>
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">
        With supporting text below as a natural lead-in to additional content.
      </p>
      <router-link to="/" class="btn btn-success" @click="goHomePage">Go Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goHomePage = () => {
  router.push({
    name: 'Home',
  });
};
</script>

<style lang="scss" scoped></style>
