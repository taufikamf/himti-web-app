import api from '../api';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export interface Event {
  id: string;
  name: string;
  gallery?: GalleryItem[];
  total_gallery_items?: number;
}

export interface GalleryItem {
  id: string;
  event_id: string;
  photo_url: string;
  event?: Event;
}

export interface EventWithGallery {
  id: string;
  name: string;
  gallery: GalleryItem[];
  total_gallery_items: number;
}

export const getGalleryItems = async (
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<Event[]>> => {
  try {
    const response = await api.get<PaginatedResponse<Event[]>>(
      `/galleries?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGalleryItemById = async (id: string): Promise<GalleryItem> => {
  try {
    const response = await api.get<ApiResponse<GalleryItem>>(`/galleries/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getEventGallery = async (
  eventId: string
): Promise<EventWithGallery> => {
  try {
    const response = await api.get<EventWithGallery>(
      `/galleries/event/${eventId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGalleryItem = async (data: Omit<GalleryItem, 'id'>) => {
  try {
    const response = await api.post<ApiResponse<GalleryItem>>('/gallery', data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateGalleryItem = async (id: string, data: Partial<Omit<GalleryItem, 'id'>>) => {
  try {
    const response = await api.put<ApiResponse<GalleryItem>>(`/gallery/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGalleryItem = async (id: string) => {
  try {
    const response = await api.delete<ApiResponse<null>>(`/gallery/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}; 