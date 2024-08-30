<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link
          class="nav-link nested-btn"
          active-class="active"
          aria-current="page"
          to="/nested/one"
          >Nested One</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link nested-btn" active-class="active" to="/nested/two"
          >Nested Two</router-link
        >
      </li>
    </ul>
    <hr class="my-4" />
    <RouterView></RouterView>
  </div>
</template>

<script setup></script>

<style scoped>
.nested-btn.active {
  background-color: #666;
  color: #fff;
  text-decoration: none;
}
</style>
