import api from '../api';
import { ApiResponse } from '@/types/api';
import { GalleryItem, Event as GalleryEvent } from './galleryService';

export interface Event extends GalleryEvent {
  gallery: GalleryItem[];
}

export const getEventById = async (id: string): Promise<Event> => {
  try {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get<ApiResponse<Event[]>>('/events');
    return response.data.data;
  } catch (error) {
    throw error;
  }
}; 