import axios from 'axios';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'development'
      ? 'http://127.0.0.1:3000'
      : 'https://api.500chow.com',
  timeoutErrorMessage: 'Network Error',
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
