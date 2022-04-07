import React, { useEffect, useState } from 'react';
import { apartmentAction } from '@/app/action/apartment.action';
import { useAppDispatch } from '@/app/hooks';
import { useApartmentStore, useAuthStore, useRoomStore } from '@/app/store';
import { formatVND } from '@/configs/common-function';
import { path } from '@/configs/path';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { roomAction } from '@/app/action/room.action';
import RoomRules from './RoomRules';
import RoomContractCreated from './RoomContractCreated';
const useStyle = makeStyles({
    container: {
        padding: `4rem 2rem`,
        boxShadow:
            'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
        margin: '2rem 0',
        borderRadius: '7.5px',
    },

    body: {
        padding: '1rem',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
});
const RoomContract = () => {
    const dispatch = useAppDispatch();
    const classes = useStyle();
    const navigate = useNavigate();
    const url = window.location.href.split('/');
    const roomId = url[url.length - 1];
    const { room, isLoadingRoom } = useRoomStore();
    const { user } = useAuthStore();
    const [createContractStep, setcreateContractStep] = useState(0);

    return (
        <div className="container">
            <Grid container spacing={2} className={`${classes.container}`}>
                {createContractStep === 0 && <RoomRules setStep={setcreateContractStep} />}
                {createContractStep === 1 && <RoomContractCreated setStep={setcreateContractStep} />}
            </Grid>
        </div>
    );
};

export default RoomContract;
