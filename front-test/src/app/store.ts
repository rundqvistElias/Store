import { configureStore } from '@reduxjs/toolkit';
import articleReducer from '../articles/articleSlice'

export const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;