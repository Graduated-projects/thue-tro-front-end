import { api } from '@/configs/request.api';
import { BodyRequest } from '@/types/interface';
import axios from 'axios';

const getInfoBeforeCreateContract = (roomId: string) => {
    return axios.get(api.contract.GET_INFO.replace(':id', roomId));
};

const payByVNPay = (body: BodyRequest) => {
    return axios.post(api.contract.PAY_BY_VNPAY, body);
};

const createContract = (body: BodyRequest) => axios.post(api.contract.CREATE, body);

const payByHWallet = (body: BodyRequest) => axios.post(api.contract.PAY_BY_H_WALLET, body);

export const contractService = {
    getInfoBeforeCreateContract,
    payByVNPay,
    createContract,
    payByHWallet,
};
