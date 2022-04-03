import React, { useEffect } from 'react';
import { apartmentAction } from '@/app/action/apartment.action';
import { useAppDispatch } from '@/app/hooks';
import { useApartmentStore, useAuthStore, useRoomStore } from '@/app/store';
import { formatVND } from '@/configs/common-function';
import { path } from '@/configs/path';
import { Button, CircularProgress, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { roomAction } from '@/app/action/room.action';
const useStyle = makeStyles({
    container: {
        padding: `4rem 0`,
    },
    imgContainer: {
        boxShadow: `0 0 5px black`,
        padding: '1rem',
        borderRadius: '7.5px',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    body: {
        padding: '1rem',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
});
const RoomByDepartmentId = () => {
    const dispatch = useAppDispatch();
    const classes = useStyle();
    const navigate = useNavigate();
    const url = window.location.href.split('/');
    const roomId = url[url.length - 1];
    const { room, isLoadingRoom } = useRoomStore();
    const { user } = useAuthStore();
    useEffect(() => {
        // dispatch(roomAction.getById(roomId));
    }, [user, roomId, dispatch]);

    const rentRoom = () => {
        console.log(`rent`);
        navigate(path.room.contract.replace(':id', roomId));
    };

    return (
        <div className="container">
            <div className={`${classes.container}`}>
                {isLoadingRoom ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div className={`${classes.imgContainer}`}>
                                <img src={room?.imageUrls[0]} alt="#" className={classes.img} />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={`${classes.body}`}>
                                <p className={`${classes.title}`}>{room?.nameOfRoom} </p>
                                <Button variant="contained" onClick={() => rentRoom()}>
                                    Thuê phòng
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </div>
        </div>
    );
};

export default RoomByDepartmentId;
