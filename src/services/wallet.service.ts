import { api } from "@/configs/request.api";
import axios from "axios";

const getBalanceInWallet = () => axios.get(api.wallet.GET_BALANCE)


export const walletService = {
     getBalanceInWallet
}