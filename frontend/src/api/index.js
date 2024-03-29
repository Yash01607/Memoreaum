import axios from 'axios';

const API = axios.create({ baseURL: 'https://memoreaum.onrender.com/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

export const fetchPostList = () => API.get('/posts');

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatepost = (id, updatedPost) =>
  API.patch(`${'/posts'}/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`${'/posts'}/${id}`);

export const likePost = (id) => API.patch(`${'/posts'}/${id}/likepost`);

export const commentPost = (value, id) =>
  API.post(`${'/posts'}/${id}/commentPost`, { value });

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);
