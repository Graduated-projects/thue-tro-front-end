import { createAsyncThunk } from '@reduxjs/toolkit';
import { BodyRequest } from '@/types/interface';
import { roomService } from '@/services/room.service';

const getRoomById = createAsyncThunk('room/id', async (params: string, thunk) => {
    const response = await roomService.getById(params);
    return response.data;
});

export const roomAction = {
    getRoomById,
};
