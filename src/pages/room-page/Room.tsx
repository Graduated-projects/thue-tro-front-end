import { roomAction } from '@/app/action/room.action';
import { useAppDispatch } from '@/app/hooks';
import { useRoomStore } from '@/app/store';
import { Button, CircularProgress, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { customContainer } from '@/configs/styles';
import { formatPhone } from '@/configs/common-function';
import { useNavigate } from 'react-router-dom';
import { path } from '@/configs/path';
const useStyles = makeStyles({
    customContainer,
    container: {
        height: '85vh',
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
    const { room, isLoadingRoom } = useRoomStore();
    const navigate = useNavigate();
    const classes = useStyles();

    const url = window.location.href.split('/');
    const id = url[url.length - 1];

    useEffect(() => {
        dispatch(roomAction.getById(id));
    }, [id, dispatch]);

    console.log(room);

    return (
        <Grid className={`${classes.customContainer} ${classes.container}`} container spacing={3}>
            {isLoadingRoom ? (
                <CircularProgress />
            ) : (
                <React.Fragment>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="inherit"
                            size="large"
                            onClick={() => navigate(-1)}
                        >
                            Quay lại
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <img className={`${classes.image}`} src={room?.images[0]} alt="imageId" />
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
                        <p className={`mt-4`} style={{ fontWeight: 'bold' }}>
                            Người đăng:
                        </p>
                        <p> {room?.sellerName} </p>
                    </Grid>
                </React.Fragment>
            )}
        </Grid>
    );
};

export default Room;
