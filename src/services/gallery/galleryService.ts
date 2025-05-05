import api from '../api';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const getGalleryItems = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await api.get<PaginatedResponse<GalleryItem[]>>('/gallery', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGalleryItem = async (id: string) => {
  try {
    const response = await api.get<ApiResponse<GalleryItem>>(`/gallery/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGalleryItem = async (data: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const response = await api.post<ApiResponse<GalleryItem>>('/gallery', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGalleryItem = async (id: string, data: Partial<Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>>) => {
  try {
    const response = await api.put<ApiResponse<GalleryItem>>(`/gallery/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGalleryItem = async (id: string) => {
  try {
    const response = await api.delete<ApiResponse<null>>(`/gallery/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 