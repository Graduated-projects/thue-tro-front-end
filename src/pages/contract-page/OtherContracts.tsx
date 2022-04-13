import { useAuthStore, useContractStore } from '@/app/store';
import React, { useEffect } from 'react';
import { contractAction } from '@/app/action/contract.action';
import { useAppDispatch } from '@/app/hooks';
import Contracts from './Contracts';
import { path } from '@/configs/path';

const OtherContracts = () => {
    const { contracts, isLoadingContracts } = useContractStore();
    const { user } = useAuthStore();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(contractAction.getContractsRenter());
    }, [dispatch, user]);

    return (
        <Contracts
            contracts={contracts}
            isLoadingContracts={isLoadingContracts}
            pathTo={path.contract.byId}

            title="Tất cả hợp đồng khác"
        />
    );
};

export default OtherContracts;
