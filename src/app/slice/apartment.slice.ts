import { ApartmentStore } from '@/types/apartment.type';
import { createSlice } from '@reduxjs/toolkit';
import { apartmentAction } from '../action/apartment.action';

const initialState: ApartmentStore = {
    apartments: [],
    apartment: null,
    isLoadingApartment: false,
    isLoadingApartments: false,
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
        },
        [apartmentAction.getAll.rejected.toString()]: (state, action) => {
            state.isLoadingApartments = false;
        },
    },
});

export const { setapartmentSlice } = apartmentSlice.actions;
export default apartmentSlice.reducer;
