import { createSlice } from '@reduxjs/toolkit';
import { LocationSearching } from '../../models/locationSearching';

const initialState: LocationSearching = {
    place: '',
    radius: 0,
    unit: 0,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocationSlice: (state, action) => {
            return action.payload;
        },
    },
});

export const { setLocationSlice } = locationSlice.actions;
export default locationSlice.reducer;
