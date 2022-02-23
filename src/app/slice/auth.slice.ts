import { User } from '@/types/auth.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: User = {
    accessToken: null,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthSlice: (state, action) => {
               state.accessToken = action.payload
        },
    },
});

export const { setAuthSlice } = authSlice.actions;
export default authSlice.reducer;
