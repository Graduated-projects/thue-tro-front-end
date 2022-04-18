import { api } from '../configs/request.api';
import axios from 'axios';
import { BodyRequest } from '@/types/interface';
import { setHeaderForAxios } from '@/configs/common-function';
import { socketService } from './socket.service';

const login = (body: BodyRequest) => {
    return axios.post(api.user.SIGN_IN, body);
};

const getUserByToken = async (token: string) => {
    if (token) await setHeaderForAxios(token);
    return axios.get(api.user.ME);
};

const logout = async () => {
    localStorage.removeItem('accessToken');
    socketService.disconnect()
};

const sendOtp = (email: string) => {
    return axios.post(api.user.SEND_OTP, { email, type: 1 });
};

const genOtp = (body: BodyRequest) => {
    return axios.post(api.user.SEND_OTP, body);
};

const isExistsEmail = (email: string) => {
    return axios.get(api.user.EXISTS + `/?email=${email}`);
};

const verifyEmail = (user: BodyRequest, type = 1) => {
    return axios.post(api.user.VERIFY_EMAIL, { email: user.email, otp: user.otp, type });
};

const detectCard = async (front: File, back: File) => {
    try {
        const frontForm = new FormData();
        const backForm = new FormData();
        frontForm.append('file', front);
        backForm.append('file', back);

        const frontCardFile = await axios.post(api.ekyc.DETECT_FRONT_CARD, frontForm, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });

        const backCardFile = await axios.post(api.ekyc.DETECT_BACK_CARD, backForm, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });

        return Promise.resolve({ frontCardFile, backCardFile });
    } catch (error) {
        Promise.reject(error);
    }
};

const register = (user: BodyRequest) => {
    return axios.post(api.user.REGISTER, user, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
};

const getUserInfoById = (userId: string) => {
    return axios.get(api.user.INFO_BY_ID.replace(':id', userId));
};

const changePassword = (user: BodyRequest) => {
    return axios.patch(api.user.CHANGE_PASSWORD, user);
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
    genOtp,
    getUserInfoById,
    changePassword,
};
