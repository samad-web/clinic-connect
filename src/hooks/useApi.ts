/**
 * Custom React Hook for API Calls
 * Provides loading, error, and data states for any API call
 */

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, ApiError } from '@/types/api';
import { config } from '@/config/env';

interface UseApiOptions<T> {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
    useMock?: boolean;
    mockData?: T;
}

interface UseApiReturn<T> {
    data: T | null;
    loading: boolean;
    error: ApiError | null;
    execute: (...args: any[]) => Promise<T | null>;
    reset: () => void;
}

/**
 * Generic API hook with loading/error states
 * 
 * @example
 * const { data, loading, error, execute } = useApi(
 *   labService.getLabTests,
 *   { immediate: true }
 * );
 */
export function useApi<T>(
    apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
    options: UseApiOptions<T> = {}
): UseApiReturn<T> {
    const { immediate = false, onSuccess, onError, useMock, mockData } = options;

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const execute = useCallback(
        async (...args: any[]) => {
            // If using mock data, return it immediately
            if ((useMock || config.shouldUseMockData()) && mockData) {
                setData(mockData);
                setError(null);
                onSuccess?.(mockData);
                return mockData;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await apiFunction(...args);

                if (response.success && response.data) {
                    setData(response.data);
                    onSuccess?.(response.data);
                    return response.data;
                } else {
                    const err = response.error || {
                        code: 'UNKNOWN_ERROR',
                        message: 'An unexpected error occurred',
                    };
                    setError(err);
                    onError?.(err);
                    return null;
                }
            } catch (err: any) {
                const apiError: ApiError = {
                    code: err.code || 'NETWORK_ERROR',
                    message: err.message || 'Network error occurred',
                    details: err.details,
                };
                setError(apiError);
                onError?.(apiError);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [apiFunction, mockData, useMock, onSuccess, onError]
    );

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate, execute]);

    return { data, loading, error, execute, reset };
}

/**
 * Hook for mutations (POST, PUT, DELETE)
 * Similar to useApi but doesn't execute immediately
 */
export function useMutation<T, TVariables = any>(
    apiFunction: (variables: TVariables) => Promise<ApiResponse<T>>,
    options: Omit<UseApiOptions<T>, 'immediate'> = {}
) {
    return useApi<T>(apiFunction as any, { ...options, immediate: false });
}
