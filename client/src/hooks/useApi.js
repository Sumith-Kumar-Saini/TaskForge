import { useState, useCallback } from "react";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, ...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall(...args);
      setLoading(false);
      return { success: true, data: result };
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
      return { success: false, error: err };
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    clearError,
  };
};

// Specialized hooks for common operations
export const useApiCall = (apiFunction) => {
  const { loading, error, execute, clearError } = useApi();

  const call = useCallback(
    async (...args) => {
      return execute(apiFunction, ...args);
    },
    [execute, apiFunction]
  );

  return {
    loading,
    error,
    call,
    clearError,
  };
};

