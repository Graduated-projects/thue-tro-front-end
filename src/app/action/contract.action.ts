import { createAsyncThunk } from '@reduxjs/toolkit';
import { BodyRequest } from '@/types/interface';
import { contractService } from '@/services/contract.service';

const getContractsOwner = createAsyncThunk('contract/owner', async () => {
    const response = await contractService.getContractsOwner();
    return response.data;
});

const getContractsRenter = createAsyncThunk('contract/renter', async () => {
    const response = await contractService.getContractsRenter();
    return response.data;
});


export const contractAction = {
    getContractsOwner,
    getContractsRenter
};
