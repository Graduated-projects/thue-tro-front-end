import { api } from '../configs/request.api';
import axios from 'axios';
import { BodyRequest } from '@/types/interface';

const getAllByCondition = (page: number, body: BodyRequest) => {
    return axios.get(api.room.getAllByCondition + `/${body}?${page}`);
};

const getById = (id: string) => {
    return axios.get(api.room.getById.replace(':id', id));
};

export const roomService = {
    getAllByCondition,
    getById,
};
