import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
  method: 'get',
};

const defaultOptions = {
  //최초 렌더링 됬을 때 watch가 무조건 발생하도록 함(watch는 기본적으로 값이 변경될 때만 발생한다)
  immediate: true,
};

export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null);
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const { onSuccess, onError, immediate } = {
    ...defaultOptions,
    ...options,
  };
  const { params } = config;
  const execute = (body) => {
    // data, error 초기화
    data.value = null;
    error.value = null;
    loading.value = true;
    axios(unref(url), {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === 'object' ? body : {},
    })
      .then((res) => {
        response.value = res;
        data.value = res.data;
        if (onSuccess) {
          onSuccess(res);
        }
      })
      .catch((err) => {
        error.value = err;
        if (onError) {
          onError(err);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  if (isRef(params) || isRef(url)) {
    // params가 변경되었을때 계속 실행되도록 watchEffect 선언
    watchEffect(execute);
  } else {
    if (immediate) {
      execute();
    }
  }

  return {
    response,
    data,
    error,
    loading,
    execute,
  };
};
