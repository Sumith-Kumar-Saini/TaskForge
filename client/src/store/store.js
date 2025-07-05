import { configureStore } from '@reduxjs/toolkit';
import dummyReducer from '../features/dummyReducer';

// You’ll import slices here as you build features

export const store = configureStore({
  reducer: {
    // Add feature reducers here:
    placeholder: dummyReducer,
  },
  // Optional: Add middleware or dev tools customization here
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
  // devTools: process.env.NODE_ENV !== 'production',
});

/**
 * 🧠 Future-proof tips:
 * - Keep reducers in 'features' folder, 1 slice per module
 * - Avoid putting business logic in components; use slices
 * - Add RTK Query or Thunks here if needed
 */
