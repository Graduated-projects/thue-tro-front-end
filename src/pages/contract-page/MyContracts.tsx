import { useAuthStore, useContractStore } from '@/app/store';
import React, { useEffect } from 'react';
import { contractAction } from '@/app/action/contract.action';
import { useAppDispatch } from '@/app/hooks';
import Contracts from './Contracts';

const MyContracts = () => {
    const { contracts, isLoadingContracts } = useContractStore();
    const { user } = useAuthStore();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(contractAction.getContractsOwner());
    }, [dispatch, user]);

    return (
        <Contracts
            contracts={contracts}
            isLoadingContracts={isLoadingContracts}
            pathTo=""
            title="Tất cả hợp đồng của tôi"
        />
    );
};

export default MyContracts;
