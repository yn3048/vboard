<template>
  <div>
    <h2 class="text-center mt-5 pb-4">Login</h2>

    <form class="login-form">
      <div class="mb-3">
        <label class="form-label">ID</label>
        <input
          type="text"
          class="form-control"
          placeholder="아이디를 입력하세요"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3 password-input">
        <label class="form-label">Password</label>
        <input
          :type="isShow ? 'password' : 'text'"
          placeholder="비밀번호를 입력하세요"
          class="form-control"
        />
        <i :class="isShow ? 'bi-eye-slash' : 'bi-eye'" @click="toggleShow"></i>
      </div>
      <div class="login-btn">
        <button class="btn btn-dark mx-2">
          <router-link to="/register" class="register">회원가입</router-link>
        </button>
        <button type="submit" class="btn btn-primary">로그인</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isShow = ref(true);

const toggleShow = () => {
  isShow.value = !isShow.value;
};
</script>

<style scoped>
.login-form {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}
.login-btn {
  display: block;
  text-align: end;
}

.register {
  color: #fff;
  text-decoration: none;
}

.password-input {
  position: relative;
}

.password-input > i {
  position: absolute;
  right: 2%;
  top: 55%;
}
</style>
