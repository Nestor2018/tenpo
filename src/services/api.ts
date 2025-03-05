import axios from "axios";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "../store";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const configureApiInterceptors = (store: Store<RootState>) => {
  api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export const fakeLogin = async (email: string, password: string) => {
  return new Promise<{ token: string }>((resolve) =>
    setTimeout(() => resolve({ token: "fake-token-123" }), 500),
  );
};

// Generamos todos los posts una vez y los paginamos
const allPosts: { id: number; title: string; body: string }[] = [];
const generatePosts = async () => {
  if (allPosts.length === 0) {
    const response = await api.get("/posts");
    const posts = response.data; // 100 posts originales
    for (let i = 0; i < 20; i++) {
      posts.forEach((post: { id: number; title: string; body: string }) => {
        allPosts.push({
          ...post,
          id: i * 100 + post.id, // IDs únicos
        });
      });
    }
  }
  return allPosts;
};

export const fetchPosts = async (page: number, pageSize: number = 10) => {
  const posts = await generatePosts();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    posts: posts.slice(start, end), // Devolvemos solo la página solicitada
    total: posts.length, // Total de elementos (2000)
  };
};

export default api;
