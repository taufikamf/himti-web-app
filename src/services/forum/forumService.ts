import api from '../api';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  comments: ForumComment[];
  createdAt: string;
  updatedAt: string;
}

export interface ForumComment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const getForumPosts = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await api.get<PaginatedResponse<ForumPost[]>>('/forum/posts', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getForumPost = async (id: string) => {
  try {
    const response = await api.get<ApiResponse<ForumPost>>(`/forum/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createForumPost = async (data: Pick<ForumPost, 'title' | 'content'>) => {
  try {
    const response = await api.post<ApiResponse<ForumPost>>('/forum/posts', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateForumPost = async (id: string, data: Partial<Pick<ForumPost, 'title' | 'content'>>) => {
  try {
    const response = await api.put<ApiResponse<ForumPost>>(`/forum/posts/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteForumPost = async (id: string) => {
  try {
    const response = await api.delete<ApiResponse<null>>(`/forum/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Comment-related operations
export const createForumComment = async (postId: string, content: string) => {
  try {
    const response = await api.post<ApiResponse<ForumComment>>(`/forum/posts/${postId}/comments`, {
      content,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateForumComment = async (postId: string, commentId: string, content: string) => {
  try {
    const response = await api.put<ApiResponse<ForumComment>>(
      `/forum/posts/${postId}/comments/${commentId}`,
      { content }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteForumComment = async (postId: string, commentId: string) => {
  try {
    const response = await api.delete<ApiResponse<null>>(
      `/forum/posts/${postId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}; 