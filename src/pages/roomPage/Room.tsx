import { roomAction } from '@/app/action/room.action';
import { useAppDispatch } from '@/app/hooks';
import { useRoomStore } from '@/app/store';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { customContainer } from '@/configs/styles';
import { formatPhone } from '@/configs/common-function';
const useStyles = makeStyles({
    customContainer,
    container : {
         height: '85vh'
    },
    image: {
        width: '100%',
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
    },
    hightlightAddress: {
        color: 'red',
        fontSize: '20px',
    },
});

const Room = () => {
    const dispatch = useAppDispatch();
    const { room } = useRoomStore();

    const classes = useStyles();

    const url = window.location.href.split('/');
    const id = url[url.length - 1];

    useEffect(() => {
        dispatch(roomAction.getRoomById(id));
    }, [id, dispatch]);

    return (
        <Grid className={`${classes.customContainer} ${classes.container}`} container spacing={3}>
            <Grid item xs={4}>
                <img className={`${classes.image}`} src={room?.images[0]} alt="#" />
            </Grid>
            <Grid item xs={4}>
                <p className={`${classes.title}`}> {room?.title} </p>
                <p className={`${classes.hightlightAddress} mt-4`}>
                    <b>Địa Chỉ:</b> {room?.address}
                </p>
                <p className={`mt-4`}>
                    <b>Mô tả:</b> {room?.description}
                </p>

                <b>
                    Diện tích: {room?.acreage}m<sup>2</sup>
                </b>
            </Grid>
            <Grid item xs={4}>
                <p className={`${classes.title}`}>Liên hệ ngay:</p>
                <Button variant="contained" color="success" size="large" className={`mt-4`}>
                    <LocalPhoneIcon /> {formatPhone(room?.phoneNumber)}
                </Button>
                <p className={`mt-4`} style={{fontWeight: 'bold'}}>Người đăng:</p>
                <p> {room?.sellerName} </p>
            </Grid>
        </Grid>
    );
};

export default Room;
