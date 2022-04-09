import { apartmentAction } from '@/app/action/apartment.action';
import { useAppDispatch } from '@/app/hooks';
import { useApartmentStore, useAuthStore } from '@/app/store';
import { formatVND } from '@/configs/common-function';
import { path } from '@/configs/path';
import { Room } from '@/types/room.type';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/img/logo.png';

const useStyle = makeStyles({
    container: {
        padding: `4rem 0`,
    },
    room: {
        margin: '1rem 0',
    },
    cardMedia: {
        height: '150px',
    },
    cardContent: {},
    cardAction: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center',
    },
    cardContainer: {},
});
const ApartmentById = () => {
    const dispatch = useAppDispatch();
    const classes = useStyle();
    const navigate = useNavigate();
    const url = window.location.href.split('/');
    const apartmentId = url[url.length - 1];
    const { rooms } = useApartmentStore();
    const { user, isLogin } = useAuthStore();
    const { apartment } = useApartmentStore();

    useEffect(() => {
        if (!isLogin) navigate(path.main.home);
    }, []);

    useEffect(() => {
        const params = {
            page: 0,
            apartmentId,
        };
        dispatch(apartmentAction.getRoomsByApartmentId(params));
        dispatch(apartmentAction.getById(apartmentId));
    }, [dispatch, apartmentId, user]);

    const gotoRoomDetail = (roomId: string) => {
        navigate(
            path.apartment.byId.replace(':id', apartmentId) + path.room.byId.replace(':id', roomId)
        );
    };

    const roomsMap = rooms.map((room: Room, index) => {
        console.log(room);

        return (
            <Grid item xs={2} key={index}>
                <Card variant="outlined" key={index} className={classes.cardContainer}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        className={classes.cardMedia}
                        image={Logo}
                    />
                    <CardContent className={classes.cardMedia}>
                        <Typography gutterBottom component="div" textAlign="center">
                            <b> {room.nameOfRoom}</b>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <React.Fragment>
                                <div>
                                    Diện tích: <b> {room.acreage} m² </b>
                                </div>
                                <div>
                                    Giá phòng:{' '}
                                    <b className="text-danger">
                                        {formatVND(room?.price as number)}
                                    </b>
                                </div>
                                <div>
                                    Tiền cọc: <b> {formatVND(room?.deposit as number)} </b>
                                </div>

                                <div>
                                    Kỳ hạn thuê:{' '}
                                    <b> {Math.ceil((room?.period as number) / 30)} tháng </b>
                                </div>
                                <div>
                                    Trạng thái:{' '}
                                    <b>
                                        {room.available ? (
                                            'Còn phòng'
                                        ) : (
                                            <span className="text-danger"> Hết phòng </span>
                                        )}
                                    </b>
                                </div>
                                <div>
                                    Ngày đăng:{' '}
                                    <b>
                                        {' '}
                                        {new Date(room?.createdDate || '').toLocaleDateString(
                                            'en-US'
                                        )}{' '}
                                    </b>
                                </div>
                            </React.Fragment>
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <Button size="small" onClick={() => gotoRoomDetail(room.id as string)}>
                            Xem chi tiết
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    });

    return (
        <div className="container">
            <div className={`${classes.container}`}>
                {isLogin && (
                    <React.Fragment>
                        <Button
                            variant="contained"
                            onClick={() => navigate(path.room.create.replace(':id', apartmentId))}
                        >
                            Tạo thêm phòng cho căn hộ
                        </Button>
                    </React.Fragment>
                )}
                <p className="mt-5">
                    Địa chỉ căn hộ: <b> {apartment?.address}</b>
                </p>
                <p> Danh sách căn hộ của bạn </p>

                <Grid container spacing={2}>
                    {roomsMap}
                </Grid>
            </div>
        </div>
    );
};

export default ApartmentById;
