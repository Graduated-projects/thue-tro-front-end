import { fireErrorMessage, setHeaderForAxios } from '@/configs/common-function';
import { UserStore } from '@/types/auth.type';
import { createSlice } from '@reduxjs/toolkit';
import { authAction } from '../action/auth.action';

const initialState: UserStore = {
    accessToken: null,
    user: null,
    isLoading: false,
    isLogin: false,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthSlice: (state, action) => {
            state.accessToken = action.payload;
        },
    },
    extraReducers: {
        [authAction.login.pending.toString()]: (state, action) => {
            state.isLoading = true;
        },
        [authAction.login.fulfilled.toString()]: (state, action) => {
            state.isLoading = false;
            state.isLogin = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            setHeaderForAxios(action.payload.accessToken);
            localStorage.setItem('accessToken', action.payload.accessToken);
        },
        [authAction.login.rejected.toString()]: (state, action) => {
            state.isLoading = false;
            state.isLogin = false;
            state.user = null;
            state.accessToken = null;
        },

        //logout
        [authAction.logout.fulfilled.toString()]: (state, action) => {
            state.isLoading = false;
            state.isLogin = false;
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem('accessToken');
        },

        //get token

        [authAction.getUserByToken.pending.toString()]: (state, action) => {
            state.isLoading = true;
        },
        [authAction.getUserByToken.fulfilled.toString()]: (state, action) => {
            state.isLoading = false;
            state.isLogin = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            setHeaderForAxios(action.payload.accessToken);
            localStorage.setItem('accessToken', action.payload.accessToken);
        },
        [authAction.getUserByToken.rejected.toString()]: (state, action) => {
            state.isLoading = false;
            state.isLogin = false;
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { setAuthSlice } = authSlice.actions;
export default authSlice.reducer;
