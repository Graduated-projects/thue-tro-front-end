import { createAsyncThunk } from '@reduxjs/toolkit';
import { BodyRequest } from '@/types/interface';
import { apartmentService } from '@/services/apartment.service';
import { Apartment } from '@/types/apartment.type';

const getAll = createAsyncThunk('apartment/all', async (params: number, thunk) => {
    const response = await apartmentService.getApartments(params);
    return response.data;
});

const getRoomsByApartmentId =  createAsyncThunk('apartment/getRooms', async (params: BodyRequest, thunk) => {
    const response = await apartmentService.getRoomsByApartmentId(params.page, params.apartmentId);
    return response.data;
});

const getById =  createAsyncThunk('apartment/id', async (params: string, thunk) => {
    const response = await apartmentService.getApartmentById(params);
    return response.data;
});

export const apartmentAction = {
      getAll,
      getRoomsByApartmentId,
      getById
};
