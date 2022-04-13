import { ContractStore } from '@/types/contract.type';
import { createSlice } from '@reduxjs/toolkit';
import { contractAction } from '@/app/action/contract.action';
const initialState: ContractStore = {
    contracts: [],
    contract: null,
    isLoadingContracts: false,
    isLoadingContract: false,
};

const contractSlice = createSlice({
    name: 'contractSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [contractAction.getContractsOwner.pending.toString()]: (state, action) => {
            state.isLoadingContracts = true;
        },
        [contractAction.getContractsOwner.fulfilled.toString()]: (state, action) => {
            state.isLoadingContracts = false;
            if (action.payload.success) {
                state.contracts = action.payload.data;
            }
        },
        [contractAction.getContractsOwner.rejected.toString()]: (state, action) => {
            state.isLoadingContracts = false;
        },

        [contractAction.getContractsRenter.pending.toString()]: (state, action) => {
            state.isLoadingContracts = true;
        },
        [contractAction.getContractsRenter.fulfilled.toString()]: (state, action) => {
            state.isLoadingContracts = false;
            if (action.payload.success) {
                state.contracts = action.payload.data;
            }
        },
        [contractAction.getContractsRenter.rejected.toString()]: (state, action) => {
            state.isLoadingContracts = false;
        },

        [contractAction.getContractById.pending.toString()]: (state, action) => {
            state.isLoadingContract = true;
        },
        [contractAction.getContractById.fulfilled.toString()]: (state, action) => {
            state.isLoadingContract = false;
            if (action.payload.success) {
                state.contract = action.payload.data;
            }
        },
        [contractAction.getContractById.rejected.toString()]: (state, action) => {
            state.isLoadingContract = false;
        },
    },
});

export const {} = contractSlice.actions;
export default contractSlice.reducer;
