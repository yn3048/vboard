import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import MyPageView from '@/views/MyPageView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

//게시글
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';

// 자유게시판
import FboardListView from '@/views/fboard/FboardListView.vue';
import FboardCreateView from '@/views/fboard/FboardCreateView.vue';
import FboardDetailView from '@/views/fboard/FboardDetailView.vue';
import FboardEditView from '@/views/fboard/FboardEditView.vue';

// Nested
import NestedView from '@/views/nested/NestedView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';

import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },

  {
    path: '/posts',
    name: 'PostList',
    component: PostListView,
  },
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreateView,
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    // path의 id 파라미터가 해당 페이지 컴포넌트의 props로 전달됨
    props: true,
    // props: (route) => ({
    //   id: parseInt(route.params.id),
    // }),
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEditView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundView,
  },
  {
    path: '/nested',
    name: 'Nested',
    component: NestedView,
    children: [
      {
        path: '',
        name: 'NestedHome',
        component: NestedHomeView,
      },
      {
        path: 'one',
        name: 'NestedOne',
        component: NestedOneView,
      },
      {
        path: 'two',
        name: 'NestedTwo',
        component: NestedTwoView,
      },
    ],
  },
  {
    path: '/my',
    name: 'MyPage',
    component: MyPageView,
    beforeEnter: [removeQueryString],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/fboard',
    name: 'FboardList',
    component: FboardListView,
  },
  {
    path: '/fboard/create',
    name: 'FboardCreate',
    component: FboardCreateView,
  },
  {
    path: '/fboard/:id',
    name: 'FboardDetail',
    component: FboardDetailView,
    // path의 id 파라미터가 해당 페이지 컴포넌트의 props로 전달됨, 선언 안 할 경우 props 값 안넘어옴!!!!
    props: true,
  },
  {
    path: '/fboard/:id/edit',
    name: 'FboardEdit',
    component: FboardEditView,
  },
];

function removeQueryString(to) {
  //✨Object.keys를 사용하면 query 객체 안에 있는 key를 배열로 반환
  if (Object.keys(to.query).length > 0) {
    return { path: to.path, query: {} };
  }
}

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// 네비게이션 가드
// router.beforeEach((to, from) => {
//   console.log('to: ', to);
//   console.log('from: ', from);
//   if (to.name === 'PostList') {
//     // router.push({ name: 'Home' });
//     // return false;
//     //return { name: 'Home' };
//     return '/';
//   }
// });

export default router;
