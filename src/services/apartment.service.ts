import { api } from '@/configs/request.api';
import { Apartment } from '@/types/apartment.type';
import { BodyRequest } from '@/types/interface';
import axios from 'axios';

const postApartment = (apartment: Apartment) => {
    return axios.post(api.apartment.CREATE, apartment);
};

const getApartments = (page: number = 0) => {
    return axios.get(api.apartment.GET_ALL + `?page=${page}`);
};
const getRoomsByApartmentId = (page: number = 0, apartmentId: string) => {
    return axios.get(api.apartment.GET_ROOMS.replace(':id', apartmentId) + `?page=${page}`);
};

const isExistsParams = (params: string | undefined, key: string) =>
    params ? `${key}=${params}&` : ``;

const searchRoom = (params: BodyRequest) => {
    const paramsRequest =
        isExistsParams(params.address, 'address') +
        isExistsParams(params.priceTo, 'priceTo') +
        isExistsParams(params.priceForm, 'priceForm') +
        isExistsParams(params.longitude, 'longitude') +
        isExistsParams(params.latitude, 'latitude') +
        isExistsParams(params.acreageFrom, 'acreageFrom') +
        isExistsParams(params.acreageTo, 'acreageTo') +
        isExistsParams(params.distanceTo, 'distanceTo') +
        isExistsParams(params.size, 'size');

    console.log(api.apartment.SEARCH + '?' + paramsRequest);

    return axios.get(api.apartment.SEARCH + '?' + paramsRequest);
};

const getApartmentById = (apartmentId: string) =>
    axios.get(api.apartment.GET_BY_ID.replace(':id', apartmentId));
export const apartmentService = {
    postApartment,
    getApartments,
    getRoomsByApartmentId,
    getApartmentById,
    searchRoom,
};
