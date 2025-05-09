import api from '../api';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export interface User {
  id: string;
  name: string;
  email: string;
  profile_picture: string | null;
}

export interface Like {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  author: string;
  created_at: string;
  author_id: string;
  user: User;
  _count: {
    likes: number;
    comments?: number;
  };
}

export const getArticles = async (
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<Article[]>> => {
  try {
    const response = await api.get<PaginatedResponse<Article[]>>(`/articles?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArticleById = async (id: string): Promise<Article> => {
  try {
    const response = await api.get<Article>(`/articles/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeArticle = async (articleId: string): Promise<{ message: string }> => {
  try {
    const response = await api.post<ApiResponse<{ message: string }>>(`/articles/${articleId}/like`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const unlikeArticle = async (articleId: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete<ApiResponse<{ message: string }>>(`/articles/${articleId}/like`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}; 