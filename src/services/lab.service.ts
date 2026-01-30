/**
 * Lab Service
 * Handles all lab-related API calls
 */

import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import {
    LabTest,
    CreateLabTestRequest,
    UpdateLabTestRequest,
    ApiResponse,
    PaginatedResponse,
} from '@/types/api';

export class LabService {
    /**
     * Get all lab tests
     */
    async getLabTests(params?: {
        page?: number;
        pageSize?: number;
        status?: string;
        urgency?: string;
    }): Promise<ApiResponse<PaginatedResponse<LabTest>>> {
        return apiClient.get(API_ENDPOINTS.LAB_TESTS.LIST, { params });
    }

    /**
     * Get lab test by ID
     */
    async getLabTest(id: string): Promise<ApiResponse<LabTest>> {
        return apiClient.get(API_ENDPOINTS.LAB_TESTS.GET(id));
    }

    /**
     * Create new lab test
     */
    async createLabTest(data: CreateLabTestRequest): Promise<ApiResponse<LabTest>> {
        return apiClient.post(API_ENDPOINTS.LAB_TESTS.CREATE, data);
    }

    /**
     * Update lab test
     */
    async updateLabTest(id: string, data: UpdateLabTestRequest): Promise<ApiResponse<LabTest>> {
        return apiClient.put(API_ENDPOINTS.LAB_TESTS.UPDATE(id), data);
    }

    /**
     * Update lab test status
     */
    async updateStatus(id: string, status: LabTest['status']): Promise<ApiResponse<LabTest>> {
        return apiClient.patch(API_ENDPOINTS.LAB_TESTS.UPDATE_STATUS(id), { status });
    }

    /**
     * Add test results
     */
    async addResults(id: string, data: UpdateLabTestRequest): Promise<ApiResponse<LabTest>> {
        return apiClient.post(API_ENDPOINTS.LAB_TESTS.ADD_RESULTS(id), data);
    }

    /**
     * Get lab tests by patient
     */
    async getPatientLabTests(patientId: string): Promise<ApiResponse<LabTest[]>> {
        return apiClient.get(API_ENDPOINTS.LAB_TESTS.BY_PATIENT(patientId));
    }
}

export const labService = new LabService();
