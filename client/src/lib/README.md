# API Integration Documentation

This directory contains the complete axios integration setup for the TaskForge application.

## 📁 File Structure

```
lib/
├── api.js              # Axios instance with interceptors
├── authService.js      # Authentication API functions
├── apiService.js       # Generic API service functions
└── README.md          # This documentation
```

## 🚀 Quick Start

### 1. API Configuration (`api.js`)

The main axios instance with:
- Base URL configuration
- Request/response interceptors
- Automatic token management
- Error handling and token refresh

```javascript
import api from '@/lib/api';

// Make authenticated requests
const response = await api.get('/protected-endpoint');
```

### 2. Authentication Service (`authService.js`)

Complete authentication functions:

```javascript
import { authService } from '@/lib/authService';

// Register user
await authService.register({ username, email, password });

// Login user
await authService.login({ email, password });

// Logout user
await authService.logout();

// Check authentication
const isAuth = authService.isAuthenticated();
const user = authService.getCurrentUser();
```

### 3. Generic API Service (`apiService.js`)

Common HTTP operations:

```javascript
import { apiService, taskService, projectService } from '@/lib/apiService';

// Generic operations
const data = await apiService.get('/endpoint');
const result = await apiService.post('/endpoint', data);

// Feature-specific services
const tasks = await taskService.getTasks();
const project = await projectService.getProject(id);
```

## 🔧 Redux Integration

### Auth Slice (`features/authSlice.js`)

Redux Toolkit slice with async thunks:

```javascript
import { useAppDispatch } from '@/hooks/reduxHooks';
import { loginUser, registerUser, logoutUser } from '@/features/authSlice';

const dispatch = useAppDispatch();

// Login
await dispatch(loginUser({ email, password }));

// Register
await dispatch(registerUser({ username, email, password }));

// Logout
await dispatch(logoutUser());
```

### Custom Hooks (`hooks/reduxHooks.js`)

Easy access to auth state:

```javascript
import {
  useAuth,
  useUser,
  useIsAuthenticated,
  useAuthLoading,
  useAuthError
} from '@/hooks/reduxHooks';

const MyComponent = () => {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useAuthLoading();
  const error = useAuthError();

  // Component logic...
};
```

## 📝 Form Integration

### Login Form Hook (`hooks/useLoginForm.js`)

```javascript
import { useLoginForm } from '@/hooks/useLoginForm';

const MyLoginForm = () => {
  const { register, handleSubmit, onSubmit, formState: { errors } } = useLoginForm();

  const handleFormSubmit = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      // Handle success
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

## 🛡️ Protected Routes

### Protected Route Component (`components/ProtectedRoute.jsx`)

```javascript
import ProtectedRoute from '@/components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
```

## 🔄 API Call Patterns

### Using the Generic API Hook (`hooks/useApi.js`)

```javascript
import { useApiCall } from '@/hooks/useApi';
import { taskService } from '@/lib/apiService';

const TaskList = () => {
  const { loading, error, call, clearError } = useApiCall(taskService.getTasks);
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const result = await call();
    if (result.success) {
      setTasks(result.data.payload);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};
```

## 🌍 Environment Configuration

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=TaskForge
```

## 🔐 Authentication Flow

1. **Login**: User submits credentials → API call → Token stored → Redux state updated
2. **Protected Requests**: Token automatically added to headers via interceptors
3. **Token Expiry**: 401 response triggers automatic token refresh
4. **Refresh Failure**: User redirected to login page
5. **Logout**: Token removed from storage → Redux state cleared

## 📊 Error Handling

- **Network Errors**: Handled by axios interceptors
- **API Errors**: Parsed and displayed to user
- **Validation Errors**: Form-level error handling
- **Auth Errors**: Automatic redirect to login

## 🧪 Testing API Calls

```javascript
// Test authentication
const testAuth = async () => {
  try {
    const response = await api.get('/auth/test');
    console.log('Auth test:', response.data);
  } catch (error) {
    console.error('Auth test failed:', error.response?.data);
  }
};
```

## 🔧 Customization

### Adding New API Services

```javascript
// In apiService.js
export const userService = {
  async getProfile() {
    return apiService.get('/user/profile');
  },

  async updateProfile(data) {
    return apiService.put('/user/profile', data);
  }
};
```

### Custom Interceptors

```javascript
// In api.js
api.interceptors.request.use((config) => {
  // Add custom headers
  config.headers['X-Custom-Header'] = 'value';
  return config;
});
```

## 🚨 Common Issues

1. **CORS Errors**: Ensure server CORS is configured correctly
2. **Token Issues**: Check localStorage and token format
3. **Network Errors**: Verify API URL and server status
4. **Form Validation**: Ensure proper field registration

## 📚 Additional Resources

- [Axios Documentation](https://axios-http.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Hook Form Documentation](https://react-hook-form.com/)

