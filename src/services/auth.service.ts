/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import {
    LoginRequest,
    LoginResponse,
    SendOTPRequest,
    RefreshTokenRequest,
    User,
    ApiResponse,
} from '@/types/api';

export class AuthService {
    /**
     * Send OTP to user's phone number
     */
    async sendOTP(data: SendOTPRequest): Promise<ApiResponse<void>> {
        return apiClient.post(API_ENDPOINTS.AUTH.SEND_OTP, data);
    }

    /**
     * Login with phone and OTP
     */
    async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);

        // Save tokens if login successful
        if (response.success && response.data) {
            apiClient.saveAuthTokens(response.data.token, response.data.refreshToken);
        }

        return response;
    }

    /**
     * Logout current user
     */
    async logout(): Promise<ApiResponse<void>> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        apiClient.clearAuthTokens();
        return response;
    }

    /**
     * Refresh authentication token
     */
    async refreshToken(data: RefreshTokenRequest): Promise<ApiResponse<{ token: string }>> {
        return apiClient.post(API_ENDPOINTS.AUTH.REFRESH, data);
    }

    /**
     * Get current authenticated user
     */
    async getCurrentUser(): Promise<ApiResponse<User>> {
        return apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
    }
}

export const authService = new AuthService();
