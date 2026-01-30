# Backend Migration Guide for Royal Pharmacy

This guide explains how to migrate the Royal Pharmacy application from mock data to a real backend API.

## Current State

The application currently uses:
- Mock data defined directly in components
- IndexedDB for offline storage
- No backend API calls

## Migration Infrastructure

We've created a complete infrastructure to support backend migration:

### 1. Environment Configuration
- `.env.example` - Template for all environment variables
- `.env.local` - Local development configuration (gitignored)
- `src/config/env.ts` - Type-safe environment variable access

### 2. API Layer
- `src/services/api/client.ts` - Axios-based HTTP client with:
  - Authentication token management
  - Automatic token refresh
  - Request/response interceptors
  - Error handling
- `src/services/api/endpoints.ts` - Centralized API endpoint definitions

### 3. Service Modules
- `src/services/auth.service.ts` - Authentication operations
- `src/services/lab.service.ts` - Lab test management
- `src/services/pharmacy.service.ts` - Pharmacy & inventory
- `src/services/admin.service.ts` - User & branch management

### 4. Type Definitions
- `src/types/api.ts` - All API request/response types
- `src/types/index.ts` - Existing domain types (already in place)

### 5. React Hooks
- `src/hooks/useApi.ts` - Generic hook for API calls with loading/error states
- `src/hooks/useMutation.ts` - Hook for mutations (POST/PUT/DELETE)

## Migration Strategy

### Phase 1: Setup (Completed)
✅ Environment configuration created
✅ API client infrastructure created
✅ Service layer implemented
✅ Type definitions added

### Phase 2: Gradual Component Migration

Use the feature flag `VITE_USE_MOCK_DATA` to toggle between mock and real data.

#### Example: Migrating Lab Tasks

**Before (Mock Data):**
```tsx
const mockTasks: LabTask[] = [
  { id: '1', patientName: 'Ramesh Kumar', ... },
  // ...
];

export default function LabTasks() {
  const [tasks, setTasks] = useState(mockTasks);
  // ...
}
```

**After (API Integration):**
```tsx
import { useApi } from '@/hooks/useApi';
import { labService } from '@/services/lab.service';

// Mock data for development
const mockTasks: LabTask[] = [ ... ];

export default function LabTasks() {
  const { data, loading, error } = useApi(
    labService.getLabTests,
    { 
      immediate: true,
      useMock: true,  // Will use mockTasks when VITE_USE_MOCK_DATA=true
      mockData: { data: mockTasks }
    }
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  const tasks = data?.data || [];
  // ... rest of component
}
```

### Phase 3: Backend Requirements

Your backend API should implement the following:

#### Authentication
- `POST /api/auth/login` - Login with phone/OTP
- `POST /api/auth/send-otp` - Send OTP to phone
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

#### RESTful Endpoints
All endpoints follow REST conventions. See `src/services/api/endpoints.ts` for complete API contract.

#### Response Format
```typescript
{
  "success": boolean,
  "data": { ... },      // On success
  "error": {           // On failure
    "code": string,
    "message": string,
    "details": {}
  }
}
```

#### Authentication
- Bearer token in `Authorization` header
- JWT recommended with refresh tokens
- Tokens stored in localStorage

## Step-by-Step Migration

### 1. Set Up Backend
- Implement required API endpoints
- Set up authentication
- Configure CORS for your frontend domain

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your backend URL
```

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_DATA=false  # Toggle to false when ready
```

### 3. Migrate One Module at a Time

**Order of migration:**
1. Authentication (auth flow must work first)
2. Lab system (simpler CRUD operations)
3. Pharmacy (more complex with inventory)
4. Admin panel (user/branch management)
5. Service appointments (physio/nursing)

### 4. Test Each Module
- Test with `VITE_USE_MOCK_DATA=true` first (should work as before)
- Switch to `VITE_USE_MOCK_DATA=false` 
- Verify all CRUD operations
- Check error handling
- Test offline scenarios

### 5. Update Offline Sync
Enhance `src/hooks/useOfflineStorage.ts` to sync with real backend:
- Queue operations when offline
- Sync to backend when online
- Handle conflicts

## Troubleshooting

### CORS Errors
Configure your backend to allow requests from your frontend domain.

### 401 Errors
- Check if token is being sent
- Verify token hasn't expired
- Check refresh token logic

### Network Errors
- Verify `VITE_API_BASE_URL` is correct
- Check if backend is running
- Inspect network tab in DevTools

## Development vs Production

**Development:**
```env
VITE_USE_MOCK_DATA=true
VITE_API_BASE_URL=http://localhost:3000/api
```

**Production:**
```env
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=https://api.royalpharmacy.com/api
```

## Next Steps

1. Review the implementation plan
2. Set up your backend API
3. Start with authentication module
4. Gradually migrate other modules
5. Test thoroughly at each step

## Support

For questions or issues during migration, refer to:
- API type definitions in `src/types/api.ts`
- Service implementations in `src/services/`
- Hook usage examples in `src/hooks/useApi.ts`
