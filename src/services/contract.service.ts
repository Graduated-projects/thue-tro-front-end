import { api } from '@/configs/request.api';
import axios from 'axios';

const getInfoBeforeCreateContract = (roomId: string, renterId: string) => {
    return axios.get(api.contract.GET_INFO +`?roomId=${roomId}&renterId=${renterId}`);
};

export const contractService = {
    getInfoBeforeCreateContract,
};
