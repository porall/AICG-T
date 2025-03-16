// src/api.ts
import axios, { type AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "", // 根据你的API服务器地址修改
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
