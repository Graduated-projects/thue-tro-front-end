import { api } from '../configs/request.api';
import axios from 'axios';
import { BodyRequest } from '@/types/interface';
import { setHeaderForAxios } from '@/configs/common-function';

const login = (body: BodyRequest) => {
    return axios.post(api.auth.SIGN_IN, body);
};

const getUserByToken = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) setHeaderForAxios(token);
    return axios.get(api.user.ME);
};

const logout = () => {
    localStorage.removeItem('accessToken');
};

const sendOtp = (email: string) => {
    return axios.post(api.auth.SEND_OTP, { email });
};

const isExistsEmail = (email: string) => {
    return axios.get(api.auth.IS_EXISTS_EMAIL + `/${email}`);
};

const register = (user: BodyRequest) => {
    return axios.post(api.auth.VERIFY_EMAIL, {email: user.email, otp: user.otp})
}

export const authService = {
    login,
    logout,
    getUserByToken,
    isExistsEmail,
    sendOtp,
    register
};
