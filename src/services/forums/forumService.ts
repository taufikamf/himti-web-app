import api from '../api';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { User } from '../users/userService';

export interface Forum {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'REJECTED';
  authorId?: string;
  author_id?: string;
  author: User;
  _count: {
    likes: number;
    comments?: number;
  };
  comments: Comment[];
  created_at: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  comments: string;
  user_id: string;
  forum_id: string;
  user: {
    id: string;
    name: string;
    email: string;
    profile_picture?: string;
  };
  createdAt?: string;
  created_at?: string;
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

export const createForum = async (data: CreateForumRequest): Promise<Forum> => {
  try {
    const response = await api.post<ApiResponse<Forum>>('/forums', data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllForums = async (status?: string, page: number = 1, limit: number = 12): Promise<PaginatedResponse<Forum[]>> => {
  try {
    const response = await api.get<PaginatedResponse<Forum[]>>('/forums', {
      params: { status, page, limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyForums = async (page: number = 1, limit: number = 12): Promise<PaginatedResponse<Forum[]>> => {
  try {
    const response = await api.get<PaginatedResponse<Forum[]>>('/forums/my-forums', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getForumById = async (id: string): Promise<Forum> => {
  try {
    const response = await api.get<Forum>(`/forums/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateForum = async (id: string, data: UpdateForumRequest): Promise<Forum> => {
  try {
    const response = await api.patch<ApiResponse<Forum>>(`/forums/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateForumStatus = async (id: string, data: UpdateForumStatusRequest): Promise<Forum> => {
  try {
    const response = await api.patch<ApiResponse<Forum>>(`/forums/${id}/status`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteForum = async (id: string): Promise<null> => {
  try {
    const response = await api.delete<ApiResponse<null>>(`/forums/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const likeForum = async (id: string): Promise<{ likes: number }> => {
  try {
    const response = await api.post<ApiResponse<{ likes: number }>>(`/forums/${id}/like`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const commentOnForum = async (id: string, comment: string): Promise<Comment> => {
  try {
    const response = await api.post<ApiResponse<Comment>>(`/forums/${id}/comment`, {
      comment: comment,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}; 