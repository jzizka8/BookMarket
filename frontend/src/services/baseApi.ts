import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Access-Control-Allow-Credentials': true,
  },
  withCredentials: true,
});

export default baseApi;
