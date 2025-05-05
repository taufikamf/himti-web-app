import api from '../api';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { User } from '../users/userService';

export interface Forum {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'REJECTED';
  authorId: string;
  author: User;
  likes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  forumId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateForumRequest {
  title: string;
  content: string;
  thumbnail?: string;
}

export interface UpdateForumRequest {
  title?: string;
  content?: string;
  thumbnail?: string;
}

export interface UpdateForumStatusRequest {
  status: 'PUBLISHED' | 'REJECTED';
}

export const createForum = async (data: CreateForumRequest): Promise<ApiResponse<Forum>> => {
  try {
    const response = await api.post<ApiResponse<Forum>>('/forums', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllForums = async (status?: string): Promise<PaginatedResponse<Forum[]>> => {
  try {
    const response = await api.get<PaginatedResponse<Forum[]>>('/forums', {
      params: { status },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyForums = async (): Promise<PaginatedResponse<Forum[]>> => {
  try {
    const response = await api.get<PaginatedResponse<Forum[]>>('/forums/my-forums');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getForumById = async (id: string): Promise<ApiResponse<Forum>> => {
  try {
    const response = await api.get<ApiResponse<Forum>>(`/forums/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateForum = async (id: string, data: UpdateForumRequest): Promise<ApiResponse<Forum>> => {
  try {
    const response = await api.patch<ApiResponse<Forum>>(`/forums/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateForumStatus = async (id: string, data: UpdateForumStatusRequest): Promise<ApiResponse<Forum>> => {
  try {
    const response = await api.patch<ApiResponse<Forum>>(`/forums/${id}/status`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteForum = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response = await api.delete<ApiResponse<null>>(`/forums/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeForum = async (id: string): Promise<ApiResponse<{ likes: number }>> => {
  try {
    const response = await api.post<ApiResponse<{ likes: number }>>(`/forums/${id}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const commentOnForum = async (id: string, comment: string): Promise<ApiResponse<Comment>> => {
  try {
    const response = await api.post<ApiResponse<Comment>>(`/forums/${id}/comment`, {
      comment,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 