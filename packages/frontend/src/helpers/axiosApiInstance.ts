import axios from 'axios';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const userFromLocalStorage = localStorage.getItem('user');
    const userFromSessionStorage = sessionStorage.getItem('user');
    const rawUser = userFromLocalStorage || userFromSessionStorage;

    const user = rawUser ? JSON.parse(rawUser) : undefined;

    if (user) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        Authorization: `Bearer ${user.access_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    } else {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      // localStorage.removeItem('user');
      // sessionStorage.removeItem('user');

      window.location.href = '/login';

      return;
    }

    return Promise.reject(error);
  },
);

export default axiosApiInstance;
