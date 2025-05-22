// services/authService.ts
import api from '../api';
import { ApiResponse } from '@/types/api';
import { AxiosError } from 'axios';

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      profile_picture?: string;
    };
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export const login = async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (name: string, email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // Extract meaningful error message from the response if available
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    }
    // Default error handling
    throw error;
  }
};

export const logout = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await api.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/forgot-password', {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (email: string, otp: string): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/verify-otp', {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string, otp: string, newPassword: string): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/reset-password', {
      email,
      otp,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
