import { createAsyncThunk } from '@reduxjs/toolkit';
import { BodyRequest } from '@/types/interface';
import { roomService } from '@/services/room.service';

const getById = createAsyncThunk('room/id', async (params: string, thunk) => {
    const response = await roomService.getById(params);
    return response.data;
});

const getAll = createAsyncThunk('room/getAll', async (page: number = 0, thunk) => {
    const response = await roomService.getAll(page);
    return response.data.content;
});

export const roomAction = {
    getById,
    getAll
};
