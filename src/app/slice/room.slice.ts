import { RoomStore } from '@/types/room.type';
import { createSlice } from '@reduxjs/toolkit';
import { roomAction } from '../action/room.action';

const initialState: RoomStore = {
    rooms: [],
    room: null,
    isLoadingRoom: false,
    isLoadingRooms: false,
};

const roomSlice = createSlice({
    name: 'roomSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [roomAction.getById.pending.toString()]: (state, action) => {
            state.isLoadingRoom = true;
        },
        [roomAction.getById.fulfilled.toString()]: (state, action) => {
            state.isLoadingRoom = false;
            state.room = action.payload
        },
        [roomAction.getById.rejected.toString()]: (state, action) => {
            state.isLoadingRoom = false;
            state.room = null
        },

        [roomAction.getAll.pending.toString()]: (state, action) => {
            state.isLoadingRooms = true;
        },
        [roomAction.getAll.fulfilled.toString()]: (state, action) => {
            state.isLoadingRooms = false;
            state.rooms = action.payload
        },
        [roomAction.getAll.rejected.toString()]: (state, action) => {
            state.isLoadingRooms = false;
            state.rooms = []
        },

    },
});

export const {} = roomSlice.actions;
export default roomSlice.reducer;
