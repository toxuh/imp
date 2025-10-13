import axios from 'axios';

export const http = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const get = async <T>(url: string, config?: Parameters<typeof http.get>[1]) => {
  const res = await http.get<T>(url, config);
  return res.data;
};

export const post = async <T, B = unknown>(url: string, body?: B, config?: Parameters<typeof http.post>[2]) => {
  const res = await http.post<T>(url, body, config);
  return res.data;
};

