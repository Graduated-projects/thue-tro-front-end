import { ApartmentStore } from '@/types/apartment.type';
import { createSlice } from '@reduxjs/toolkit';
import { apartmentAction } from '../action/apartment.action';

const initialState: ApartmentStore = {
    apartments: [],
    apartment: null,
    isLoadingApartment: false,
    isLoadingApartments: false,
    rooms: [],
    isLoadingRooms: false,
    totalOfApartments: 0,
};

const apartmentSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setapartmentSlice: (state, action) => {
            return action.payload;
        },
    },
    extraReducers: {
        [apartmentAction.getAll.pending.toString()]: (state, action) => {
            state.isLoadingApartments = true;
        },
        [apartmentAction.getAll.fulfilled.toString()]: (state, action) => {
            state.isLoadingApartments = false;
            state.apartments = action.payload.data?.content ?? [];
            state.totalOfApartments = action.payload.data?.totalElements;
        },
        [apartmentAction.getAll.rejected.toString()]: (state, action) => {
            state.isLoadingApartments = false;
        },

        [apartmentAction.getRoomsByApartmentId.pending.toString()]: (state, action) => {
            state.isLoadingRooms = true;
        },
        [apartmentAction.getRoomsByApartmentId.fulfilled.toString()]: (state, action) => {
            state.isLoadingRooms = false;
            state.rooms = action.payload.data?.content ?? [];
        },
        [apartmentAction.getRoomsByApartmentId.rejected.toString()]: (state, action) => {
            state.isLoadingRooms = false;
        },

        [apartmentAction.getById.pending.toString()]: (state, action) => {
            state.isLoadingApartment = true;
        },
        [apartmentAction.getById.fulfilled.toString()]: (state, action) => {
            state.isLoadingApartment = false;
            state.apartment = action.payload.data;
        },
        [apartmentAction.getById.rejected.toString()]: (state, action) => {
            state.isLoadingApartment = false;
        },

        [apartmentAction.searchRoom.pending.toString()]: (state, action) => {
            state.isLoadingApartments = true;
        },
        [apartmentAction.searchRoom.fulfilled.toString()]: (state, action) => {
            state.isLoadingApartments = false;
            state.apartments = action.payload.data.content;
        },
        [apartmentAction.searchRoom.rejected.toString()]: (state, action) => {
            state.isLoadingApartments = false;
        },
    },
});

export const { setapartmentSlice } = apartmentSlice.actions;
export default apartmentSlice.reducer;
