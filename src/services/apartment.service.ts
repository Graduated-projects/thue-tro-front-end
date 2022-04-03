import { api } from '@/configs/request.api';
import { Apartment } from '@/types/apartment.type';
import axios from 'axios';


const postApartment = (apartment: Apartment) => {
     return axios.post(api.apartment.CREATE, apartment)
};

const getApartments = (page: number = 0) => {
     return axios.get(api.apartment.GET_ALL + `?page=${page}`)
}
const getRoomsByApartmentId = (page: number = 0, apartmentId: string) => {
     return axios.get(api.apartment.GET_ROOMS.replace(":id", apartmentId) + `?page=${page}`)
}
const getApartmentById = (apartmentId: string) => axios.get(api.apartment.GET_BY_ID.replace(":id", apartmentId))
export const apartmentService = {
     postApartment,
     getApartments,
     getRoomsByApartmentId,
     getApartmentById
}
