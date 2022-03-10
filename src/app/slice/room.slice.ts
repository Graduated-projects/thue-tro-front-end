import { RoomStore } from '@/types/room.type';
import { createSlice } from '@reduxjs/toolkit';
import { roomAction } from '../action/room.action';

const initialState: RoomStore = {
    rooms: null,
    room: null,
    isLoadingRoom: false,
    isLoadingRooms: false,
};

const roomSlice = createSlice({
    name: 'roomSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [roomAction.getRoomById.pending.toString()]: (state, action) => {
            state.isLoadingRoom = true;
        },
        [roomAction.getRoomById.fulfilled.toString()]: (state, action) => {
            state.isLoadingRoom = false;
            state.room = action.payload
        },
        [roomAction.getRoomById.rejected.toString()]: (state, action) => {
            state.isLoadingRoom = false;
            state.room = null
        },
    },
});

export const {} = roomSlice.actions;
export default roomSlice.reducer;
