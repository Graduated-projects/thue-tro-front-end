import { apartmentAction } from '@/app/action/apartment.action';
import { useAppDispatch } from '@/app/hooks';
import { useApartmentStore, useAuthStore } from '@/app/store';
import { formatVND } from '@/configs/common-function';
import { path } from '@/configs/path';
import { Room } from '@/types/room.type';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const useStyle = makeStyles({
    container: {
        padding: `4rem 0`,
    },
    room: {
        margin: '1rem 0',
    },
    roomElement: {
        backgroundColor: 'white',
        boxShadow: `rgb(38, 57, 77) 0px 20px 30px -10px`,
        padding: '1rem 2rem',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
            backgroundColor: '#dddddd',
        },
    },
});
const ApartmentById = () => {
    const dispatch = useAppDispatch();
    const classes = useStyle();
    const navigate = useNavigate();
    const url = window.location.href.split('/');
    const apartmentId = url[url.length - 1];
    const { rooms } = useApartmentStore();
    const { user, isLogin } = useAuthStore();
    useEffect(() => {
        const params = {
            page: 0,
            apartmentId,
        };
        dispatch(apartmentAction.getRoomsByApartmentId(params));
    }, [dispatch, apartmentId, user]);

    const gotoRoomDetail = (roomId: string) => {
        navigate(
            path.apartment.byId.replace(':id', apartmentId) + path.room.byId.replace(':id', roomId)
        );
    };

    const roomsMap = rooms.map((room: Room, index) => {
        return (
            <Grid
                item
                xs={6}
                className={`${classes.room}`}
                key={index}
                onClick={() => gotoRoomDetail(room.id as string)}
            >
                <div className={`${classes.roomElement}`}>
                    <p>Tên phòng: {room.nameOfRoom}</p>
                    <p>
                        Giá phòng: <b className="text-danger"> {formatVND(Number(room.price))} </b>
                    </p>
                    <p>Tầng: {room.floor || 'Trệt'} </p>
                </div>
            </Grid>
        );
    });

    return (
        <div className="container">
            <div className={`${classes.container}`}>
                {isLogin && (
                    <React.Fragment>
                        <div className={`text-danger`}>
                            Chỉ có chủ trọ mới thấy chức năng thêm phòng!
                        </div>
                        <Button
                            variant="contained"
                            onClick={() => navigate(path.room.create.replace(':id', apartmentId))}
                        >
                            Tạo thêm phòng cho căn hộ
                        </Button>
                    </React.Fragment>
                )}
                <p> Danh sách căn hộ của bạn </p>

                <Grid container spacing={2}>
                    {roomsMap}
                </Grid>
            </div>
        </div>
    );
};

export default ApartmentById;
