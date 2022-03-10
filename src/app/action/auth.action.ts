import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/auth.service';
import { BodyRequest } from '@/types/interface';

const login = createAsyncThunk('user/login', async (params: BodyRequest, thunk) => {
    try {
        const response = await authService.login(params);
        return response.data;
    } catch (error: any) {
        return thunk.rejectWithValue(error?.response.data)
    }
  
});

const logout = createAsyncThunk('user/logout', async () => {
    authService.logout();
    return null;
});

const getUserByToken = createAsyncThunk('user/getUserByToken', async () => {
    const response = await authService.getUserByToken();
    return response.data;
});

export const authAction = {
    login,
    logout,
    getUserByToken,
};
