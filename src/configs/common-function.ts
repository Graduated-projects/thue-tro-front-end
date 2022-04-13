import axios from 'axios';
import Swal from 'sweetalert2';

export const formatPhone = (phone?: string) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return ' ' + match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return '';
};

export const setHeaderForAxios = (token: string) => {
    axios.interceptors.request.use((config = {}) => {
        const currentToken = localStorage.getItem('accessToken');

        if (config.headers && token === currentToken) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
};

export const formatVND = (currancy: number | string) => {
    return currancy.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND',
    });
};

export const fireErrorMessage = (errorMessage: any) => {
    const message =
        (errorMessage.response &&
            errorMessage.response.data &&
            errorMessage.response.data.message) ||
        errorMessage.message ||
        errorMessage.toString();

    Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: message,
    });
};

export const limitString = (string: string, length: number) => {
    return string.length > length ? string.slice(0, length) + '...' : string;
};

export const getIdByUrl = () => {
    const url = window.location.href.split('/');
    return url[url.length - 1];
};
