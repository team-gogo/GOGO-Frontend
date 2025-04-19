import axios from 'axios';

const clientInstance = axios.create({
  baseURL: '/api/server',
  withCredentials: true,
});

clientInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.response.data.isRefreshError
    ) {
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  },
);

export default clientInstance;
