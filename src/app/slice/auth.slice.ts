import { setHeaderForAxios } from '@/configs/common-function';
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

            if (action.payload.success) {
                state.isLogin = true;
                state.accessToken = action.payload.data.access_token;
            }
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
            console.log(`logout successfully!`);
            localStorage.removeItem('accessToken');
        },

        //get token

        [authAction.getUserByToken.pending.toString()]: (state, action) => {
            state.isLoading = true;
        },
        [authAction.getUserByToken.fulfilled.toString()]: (state, action) => {
            state.isLoading = false;
            console.log(`getByToken: `, action.payload.data);

            if (action.payload.success) {
                state.isLoading = false;
                state.isLogin = true;
                state.user = action.payload.data;
                state.accessToken = localStorage.getItem("accessToken")
                
            }
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
