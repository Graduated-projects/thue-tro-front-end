import { api } from '../configs/request.api';
import axios from 'axios';
import { BodyRequest } from '@/types/interface';

const login = (body: BodyRequest) => {
    return axios.post(api.auth.SIGN_IN, body);
};

export const authService = {
    login,
};
