import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://192.168.0.13:3000',
  withCredentials: true,
});

export default baseApi;
