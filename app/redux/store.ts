import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
// import userReducer from './userSlice';

// Combine reducers and create store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // user: userReducer,
  },
});

// RootState type for useSelector
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch type for useDispatch
export type AppDispatch = typeof store.dispatch;
