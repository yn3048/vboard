import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components/app'], // 필요한 컴포넌트 디렉토리만 ts파일에 추가
      dts: true, // 전체 컴포넌트 타입(ts타입스크립트) 정보를 담은 파일 추가
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
