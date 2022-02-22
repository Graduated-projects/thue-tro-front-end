import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import locationSlice from './slice/locationSlice';

export const store = configureStore({
  reducer: {
      location: locationSlice
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

export const useLocationStore = () => useSelector((state: RootState) => state.location)