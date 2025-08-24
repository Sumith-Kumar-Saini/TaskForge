import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Auth selectors
export const useAuth = () => {
  return useSelector((state) => state.auth);
};

export const useUser = () => {
  return useSelector((state) => state.auth.user);
};

export const useIsAuthenticated = () => {
  return useSelector((state) => state.auth.isAuthenticated);
};

export const useAuthLoading = () => {
  return useSelector((state) => state.auth.isLoading);
};

export const useAuthError = () => {
  return useSelector((state) => state.auth.error);
};

export const useAuthSuccess = () => {
  return useSelector((state) => state.auth.success);
};
