import { api } from '@/configs/request.api';
import { BodyRequest } from '@/types/interface';
import axios from 'axios';

const getBalanceInWallet = (page: number = 0) =>
    axios.get(api.wallet.GET_BALANCE + `?page=${page}`);

const getTransactionHistory = (page: number = 0) =>
    axios.get(api.wallet.TRANSACTION_HISTORY + `?page=${page}`);

const rechargeMoneyToWallet = (body: BodyRequest) => axios.post(api.wallet.RECHARGE, body);

const withdrawPaypal = (cost: number = 0) =>
    axios.post(api.wallet.WITHDRAW_PAYPAL, { amount: cost });

export const walletService = {
    getBalanceInWallet,
    getTransactionHistory,
    rechargeMoneyToWallet,
    withdrawPaypal,
};
