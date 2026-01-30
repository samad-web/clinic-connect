/**
 * Admin Service
 * Handles all admin-related API calls
 */

import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import {
    User,
    CreateUserRequest,
    UpdateUserRequest,
    Branch,
    CreateBranchRequest,
    UpdateBranchRequest,
    ApiResponse,
    PaginatedResponse,
} from '@/types/api';

export class AdminService {
    // User Management
    async getUsers(params?: {
        page?: number;
        pageSize?: number;
        role?: string;
        search?: string;
    }): Promise<ApiResponse<PaginatedResponse<User>>> {
        return apiClient.get(API_ENDPOINTS.USERS.LIST, { params });
    }

    async getUser(id: string): Promise<ApiResponse<User>> {
        return apiClient.get(API_ENDPOINTS.USERS.GET(id));
    }

    async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
        return apiClient.post(API_ENDPOINTS.USERS.CREATE, data);
    }

    async updateUser(id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> {
        return apiClient.put(API_ENDPOINTS.USERS.UPDATE(id), data);
    }

    async deleteUser(id: string): Promise<ApiResponse<void>> {
        return apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
    }

    async toggleUserAuthorization(id: string, isAuthorized: boolean): Promise<ApiResponse<User>> {
        return apiClient.patch(API_ENDPOINTS.USERS.TOGGLE_AUTHORIZATION(id), { isAuthorized });
    }

    // Branch Management
    async getBranches(params?: {
        page?: number;
        pageSize?: number;
        search?: string;
    }): Promise<ApiResponse<PaginatedResponse<Branch>>> {
        return apiClient.get(API_ENDPOINTS.BRANCHES.LIST, { params });
    }

    async getBranch(id: string): Promise<ApiResponse<Branch>> {
        return apiClient.get(API_ENDPOINTS.BRANCHES.GET(id));
    }

    async createBranch(data: CreateBranchRequest): Promise<ApiResponse<Branch>> {
        return apiClient.post(API_ENDPOINTS.BRANCHES.CREATE, data);
    }

    async updateBranch(id: string, data: UpdateBranchRequest): Promise<ApiResponse<Branch>> {
        return apiClient.put(API_ENDPOINTS.BRANCHES.UPDATE(id), data);
    }

    async deleteBranch(id: string): Promise<ApiResponse<void>> {
        return apiClient.delete(API_ENDPOINTS.BRANCHES.DELETE(id));
    }

    // Dashboard Stats
    async getAdminStats(): Promise<ApiResponse<any>> {
        return apiClient.get(API_ENDPOINTS.DASHBOARD.ADMIN_STATS);
    }
}

export const adminService = new AdminService();
