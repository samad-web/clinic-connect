/**
 * Pharmacy Service
 * Handles all pharmacy-related API calls
 */

import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import {
    Medicine,
    PharmacyOrder,
    CreateOrderRequest,
    ApiResponse,
    PaginatedResponse,
} from '@/types/api';

export class PharmacyService {
    // Medicine Management
    async getMedicines(params?: {
        page?: number;
        pageSize?: number;
        search?: string;
        category?: string;
    }): Promise<ApiResponse<PaginatedResponse<Medicine>>> {
        return apiClient.get(API_ENDPOINTS.PHARMACY.MEDICINES.LIST, { params });
    }

    async getMedicine(id: string): Promise<ApiResponse<Medicine>> {
        return apiClient.get(API_ENDPOINTS.PHARMACY.MEDICINES.GET(id));
    }

    async searchMedicines(query: string): Promise<ApiResponse<Medicine[]>> {
        return apiClient.get(API_ENDPOINTS.PHARMACY.MEDICINES.SEARCH, {
            params: { q: query },
        });
    }

    async createMedicine(data: Omit<Medicine, 'id'>): Promise<ApiResponse<Medicine>> {
        return apiClient.post(API_ENDPOINTS.PHARMACY.MEDICINES.CREATE, data);
    }

    async updateMedicine(id: string, data: Partial<Medicine>): Promise<ApiResponse<Medicine>> {
        return apiClient.put(API_ENDPOINTS.PHARMACY.MEDICINES.UPDATE(id), data);
    }

    async deleteMedicine(id: string): Promise<ApiResponse<void>> {
        return apiClient.delete(API_ENDPOINTS.PHARMACY.MEDICINES.DELETE(id));
    }

    // Order Management
    async getOrders(params?: {
        page?: number;
        pageSize?: number;
        status?: string;
    }): Promise<ApiResponse<PaginatedResponse<PharmacyOrder>>> {
        return apiClient.get(API_ENDPOINTS.PHARMACY.ORDERS.LIST, { params });
    }

    async getOrder(id: string): Promise<ApiResponse<PharmacyOrder>> {
        return apiClient.get(API_ENDPOINTS.PHARMACY.ORDERS.GET(id));
    }

    async createOrder(data: CreateOrderRequest): Promise<ApiResponse<PharmacyOrder>> {
        return apiClient.post(API_ENDPOINTS.PHARMACY.ORDERS.CREATE, data);
    }

    async updateOrderStatus(
        id: string,
        status: PharmacyOrder['status']
    ): Promise<ApiResponse<PharmacyOrder>> {
        return apiClient.patch(API_ENDPOINTS.PHARMACY.ORDERS.UPDATE_STATUS(id), { status });
    }

    async getPatientOrders(patientId: string): Promise<ApiResponse<PharmacyOrder[]>> {
        return apiClient.get(API_ENDPOINTS.PHARMACY.ORDERS.BY_PATIENT(patientId));
    }

    // Inventory Management
    async getLowStockItems(): Promise<ApiResponse<Medicine[]>> {
        return apiClient.get(API_ENDPOINTS.PHARMACY.INVENTORY.LOW_STOCK);
    }

    async updateInventory(id: string, quantity: number): Promise<ApiResponse<Medicine>> {
        return apiClient.put(API_ENDPOINTS.PHARMACY.INVENTORY.UPDATE(id), { quantity });
    }
}

export const pharmacyService = new PharmacyService();
