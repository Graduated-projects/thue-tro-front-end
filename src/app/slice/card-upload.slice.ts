import { NationalCardFile } from '@/types/file-upload.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: NationalCardFile = {
    front: [],
    back: [],
};

const cardUpload = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setFront: (state, action) => {
            state.front.push(action.payload);
        },
        setBack: (state, action) => {
            state.back.push(action.payload);
        },
    },
});

export const { setFront, setBack } = cardUpload.actions;
export default cardUpload.reducer;
