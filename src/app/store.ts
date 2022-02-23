import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import authSlice from './slice/auth.slice';
import locationSlice from './slice/location.slice';

export const store = configureStore({
    reducer: {
        location: locationSlice,
        auth: authSlice,
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

export const useLocationStore = () => useSelector((state: RootState) => state.location);
export const useAuthStore = () => useSelector((state: RootState) => state.auth);
