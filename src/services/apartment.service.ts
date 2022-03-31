import { api } from '@/configs/request.api';
import { Apartment } from '@/types/apartment.type';
import axios from 'axios';


const postApartment = (apartment: Apartment) => {
     return axios.post(api.apartment.CREATE, apartment)
};

const getApartments = (page: number = 0) => {
     return axios.get(api.apartment.GET_ALL + `?page=${page}`)
}

export const apartmentService = {
     postApartment,
     getApartments
}
