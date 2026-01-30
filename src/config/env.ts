/**
 * Environment Configuration
 * Centralized access to environment variables with type safety
 */

interface EnvironmentConfig {
    // API Configuration
    apiBaseUrl: string;
    apiTimeout: number;

    // Feature Flags  
    useMockData: boolean;
    enableOfflineMode: boolean;

    // Authentication
    authTokenKey: string;
    refreshTokenKey: string;

    // App Configuration
    appName: string;
    appVersion: string;
    environment: 'development' | 'staging' | 'production';
}

class Config {
    private static instance: Config;
    private config: EnvironmentConfig;

    private constructor() {
        this.config = {
            // API Configuration
            apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
            apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,

            // Feature Flags
            useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
            enableOfflineMode: import.meta.env.VITE_ENABLE_OFFLINE_MODE !== 'false',

            // Authentication
            authTokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || 'royal_pharmacy_token',
            refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_KEY || 'royal_pharmacy_refresh_token',

            // App Configuration
            appName: import.meta.env.VITE_APP_NAME || 'Royal Pharmacy',
            appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
            environment: (import.meta.env.VITE_ENVIRONMENT as EnvironmentConfig['environment']) || 'development',
        };
    }

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    public get(): EnvironmentConfig {
        return this.config;
    }

    public isProduction(): boolean {
        return this.config.environment === 'production';
    }

    public isDevelopment(): boolean {
        return this.config.environment === 'development';
    }

    public shouldUseMockData(): boolean {
        return this.config.useMockData;
    }
}

export const config = Config.getInstance();
export type { EnvironmentConfig };
