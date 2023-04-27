import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import promptReducer from '../features/promptfolio/promptfolioSlice';

export const store = configureStore({
  reducer: {
    promptfolio: promptReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
