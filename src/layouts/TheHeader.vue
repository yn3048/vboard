<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container-fluid">
        <router-link class="navbar-brand ps-3" to="/">Vboard</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-5 me-auto">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" aria-current="page" to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/posts">게시글</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/fboard"
                >자유게시판</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/nested">Nested</router-link>
            </li>
          </ul>
          <div class="dropdown login-btn">
            <button
              class="btn btn-outline-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              로그인
            </button>
            <ul class="dropdown-menu login-items">
              <li><router-link class="dropdown-item" to="/my">MyPage</router-link></li>
              <li><a class="dropdown-item" href="/login">로그아웃</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
.login-btn {
  padding-right: 60px;
}
.login-btn button:hover {
  color: #686868;
  font-weight: bold;
}
</style>
