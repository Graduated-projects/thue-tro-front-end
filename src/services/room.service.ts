import { api } from '../configs/request.api';
import axios from 'axios';
import { BodyRequest } from '@/types/interface';
import { Room } from '@/types/room.type';

const getAllByCondition = (page: number, body: BodyRequest) => {
    return axios.get(api.room.getAllByCondition + `/${body}?${page}`);
};

const getById = (id: string) => {
    return axios.get(api.room.getById.replace(':id', id));
};

const getAll = (page = 0) => {
    return axios.get(api.room.getAll + `?${page}`);
};

const getAllServiceOfRoom = (page = 0) => {
    return axios.post(api.room.getAllServiceOfRoom);
};
const getServiceUnitByServiceId = (serviceId: number) => {
    return axios.get(api.room.getServiceUnitByServiceId.replace(':id', serviceId.toString()));
};

const createRoom = (room: Room, apartmentId: string) => {
    const rooms = [room];
    return axios.post(api.room.create + `/${apartmentId}`, { rooms });
};

export const roomService = {
    getAllByCondition,
    getById,
    getAll,
    getAllServiceOfRoom,
    getServiceUnitByServiceId,
    createRoom,
};
