import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2999',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token'); //always checks if there a token in the localStorage

  return config;
});

export default instance;
