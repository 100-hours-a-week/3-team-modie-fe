import axiosInstance from "./axiosConfig";

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.data?.message || error.message;

    switch (status) {
      case 401:
        console.error("401 Unauthorized:", message);
        // 서버에서 로그인 세션 만료 시
        // window.location.href = '/login';
        break;

      case 403:
        console.error("403 Forbidden:", message);
        break;

      case 404:
        console.warn("404 Not Found:", message);
        break;

      case 409:
        console.warn("409 Conflict:", message);
        break;

      case 400:
        console.warn("400 Bad Request:", message);
        break;

      default:
        console.error("Unhandled Error:", message);
        break;
    }

    return Promise.reject(error);
  }
);
