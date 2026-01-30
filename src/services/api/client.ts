/**
 * API Client
 * Axios-based HTTP client with interceptors for authentication and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { config } from '@/config/env';
import { ApiResponse, ApiError } from '@/types/api';

class ApiClient {
    private static instance: ApiClient;
    private client: AxiosInstance;

    private constructor() {
        this.client = axios.create({
            baseURL: config.get().apiBaseUrl,
            timeout: config.get().apiTimeout,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    private setupInterceptors() {
        // Request interceptor - Add auth token
        this.client.interceptors.request.use(
            (config) => {
                const token = this.getAuthToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor - Handle errors
        this.client.interceptors.response.use(
            (response) => response,
            async (error: AxiosError<ApiError>) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

                // Handle 401 - Token expired
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const newToken = await this.refreshToken();
                        if (newToken && originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            return this.client(originalRequest);
                        }
                    } catch (refreshError) {
                        // Refresh failed - logout user
                        this.handleLogout();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(this.handleError(error));
            }
        );
    }

    private getAuthToken(): string | null {
        return localStorage.getItem(config.get().authTokenKey);
    }

    private setAuthToken(token: string): void {
        localStorage.setItem(config.get().authTokenKey, token);
    }

    private getRefreshToken(): string | null {
        return localStorage.getItem(config.get().refreshTokenKey);
    }

    private async refreshToken(): Promise<string | null> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return null;

        try {
            const response = await axios.post(`${config.get().apiBaseUrl}/auth/refresh`, {
                refreshToken,
            });

            const newToken = response.data.data.token;
            this.setAuthToken(newToken);
            return newToken;
        } catch (error) {
            return null;
        }
    }

    private handleLogout(): void {
        localStorage.removeItem(config.get().authTokenKey);
        localStorage.removeItem(config.get().refreshTokenKey);
        window.location.href = '/login';
    }

    private handleError(error: AxiosError<ApiError>): ApiError {
        if (error.response?.data) {
            return error.response.data;
        }

        if (error.code === 'ECONNABORTED') {
            return {
                code: 'TIMEOUT',
                message: 'Request timeout. Please try again.',
            };
        }

        if (!error.response) {
            return {
                code: 'NETWORK_ERROR',
                message: 'Network error. Please check your connection.',
            };
        }

        return {
            code: 'UNKNOWN_ERROR',
            message: error.message || 'An unexpected error occurred.',
        };
    }

    // HTTP Methods
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.client.post(url, data, config);
        return response.data;
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.client.put(url, data, config);
        return response.data;
    }

    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.client.patch(url, data, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(url, config);
        return response.data;
    }

    // Public methods for auth management
    public saveAuthTokens(token: string, refreshToken: string): void {
        this.setAuthToken(token);
        localStorage.setItem(config.get().refreshTokenKey, refreshToken);
    }

    public clearAuthTokens(): void {
        this.handleLogout();
    }
}

export const apiClient = ApiClient.getInstance();
