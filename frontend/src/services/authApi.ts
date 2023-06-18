import { User } from '../models/user';
import { ResponseSingle } from '../models/response';
import baseApi from './baseApi';

export const login = async (username: string, password: string) => {
  const resp = await baseApi.post('/auth/login', {
    username: username,
    password: password,
  });
  return resp.data;
};

export const auth = async () => {
  const resp = await baseApi.get<ResponseSingle<User>>('/auth', {});
  return resp.data;
};

export const logout = async () => {
  const resp = await baseApi.post<ResponseSingle<User>>('/auth/logout', {});
  return resp.data;
};
