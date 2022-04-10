import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/auth.service';
import { BodyRequest } from '@/types/interface';
import { socketService } from '@/services/socket.service';

const login = createAsyncThunk('user/login', async (params: BodyRequest, thunk) => {
    try {
        const response = await authService.login(params);
        if (response.data.success) {
            localStorage.setItem('accessToken', response.data.data.access_token);
            return response.data;
        }
        return response.data;
    } catch (error: any) {
        return thunk.rejectWithValue(error?.response.data);
    }
});

const logout = createAsyncThunk('user/logout', async () => {
    authService.logout();
    return null;
});

const getUserByToken = createAsyncThunk('user/getUserByToken', async (token: string) => {
    const response = await authService.getUserByToken(token);

    // const user = {
    //     userId: response.data.data.id,
    // };
    // socketService.connect(user)
    return response.data;
});

export const authAction = {
    login,
    logout,
    getUserByToken,
};
