import { api } from '../configs/request.api';
import axios from 'axios';
import { BodyRequest } from '@/types/interface';
import { setHeaderForAxios } from '@/configs/common-function';

const login = (body: BodyRequest) => {
    return axios.post(api.user.SIGN_IN, body);
};

const getUserByToken = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) await setHeaderForAxios(token);
    return axios.get(api.user.ME);
};

const logout = () => {
    localStorage.removeItem('accessToken');
};

const sendOtp = (email: string) => {
    return axios.post(api.user.SEND_OTP, { email, type: 1 });
};

const isExistsEmail = (email: string) => {
    return axios.get(api.user.EXISTS + `/?email=${email}`);
};

const verifyEmail = (user: BodyRequest) => {
    return axios.post(api.user.VERIFY_EMAIL, { email: user.email, otp: user.otp, type: 1 });
};

const detectCard = async (front: File, back: File) => {
    const frontForm = new FormData();
    const backForm = new FormData();
    frontForm.append('file', front);
    backForm.append('file', back);

    const resultFront = await axios.post(api.ekyc.DETECT_FRONT_CARD, frontForm, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });

    const resultBack = await axios.post(api.ekyc.DETECT_BACK_CARD, backForm, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
    console.log(resultFront, resultBack);

    return Promise.resolve();
};

const register = (user: BodyRequest) => {
    return axios.post(api.user.REGISTER, user, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
};

export const authService = {
    login,
    logout,
    getUserByToken,
    isExistsEmail,
    sendOtp,
    verifyEmail,
    detectCard,
    register,
};
