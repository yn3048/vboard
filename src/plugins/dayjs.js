import dayjs from 'dayjs';

export default {
  install(app) {
    // 컴포넌트 인스턴스 전체에서 접근하기 위한 설정
    app.config.globalProperties.$dayjs = dayjs;
    // script setup 에서도 접근 할 수 있게 라이브러리 주입시킴
    app.provide('dayjs', dayjs);
  },
};
