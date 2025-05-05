import api from '../api';
import { ApiResponse } from '@/types/api';

export interface User {
  id: string;
  name: string;
  email: string;
  profile_picture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  name?: string;
  profile_picture?: string;
}

export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await api.get<ApiResponse<User>>('/users/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  try {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  try {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> => {
  try {
    const response = await api.patch<ApiResponse<User>>(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 