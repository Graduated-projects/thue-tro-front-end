import { url } from '../configs/request.api';
import axios from 'axios';
import { BodyRequest } from '@/models/interface';

const login = (body: BodyRequest) => {
    console.log(url.auth.SIGN_IN);
    return axios.post(url.auth.SIGN_IN, body);
};

export const authService = {
    login,
};
