import { typeOfPayment } from '@/configs/const';
import React from 'react';
import RoomContractPayMethod from '../room-page/RoomContractPayMethod';

const Recharge = () => {
    return (
        <div className="container">
            <RoomContractPayMethod type={typeOfPayment.RECHARGE} />
        </div>
    );
};

export default Recharge;
