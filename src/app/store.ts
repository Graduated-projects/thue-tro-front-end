import { configureStore, ThunkAction, Action  } from '@reduxjs/toolkit';
import { useAppSelector } from './hooks';


import authSlice from './slice/auth.slice';
import locationSlice from './slice/location.slice';
import roomSlice from './slice/room.slice';

export const store = configureStore({
    reducer: {
        location: locationSlice,
        auth: authSlice,
        room: roomSlice
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
export const useLocationStore = () => useAppSelector((state) => state.location);
export const useAuthStore = () => useAppSelector((state) => state.auth);
export const useRoomStore = () => useAppSelector((state) => state.room);
