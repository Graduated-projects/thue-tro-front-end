import { createSlice } from '@reduxjs/toolkit';
import { LocationSearching } from '@/types/location.type';
import { hcmLatLng } from '@/configs/location';

const initialState: LocationSearching = {
    place: {
        name: 'Thành phố Hồ Chí Minh',
        position: hcmLatLng,
    },
    radius: 0,
    unit: 0,
    zoom: 15,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocationSlice: (state, action) => {         
            return action.payload
        },
    },
});

export const { setLocationSlice } = locationSlice.actions;
export default locationSlice.reducer;
