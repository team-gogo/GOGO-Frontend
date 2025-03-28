import axios from 'axios';

const clientInstance = axios.create({
  baseURL: '/api/server',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

clientInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // window.location.href = '/signin';

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default clientInstance;
