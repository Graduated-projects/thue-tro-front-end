import React, { useEffect } from 'react';
import { apartmentAction } from '@/app/action/apartment.action';
import { useAppDispatch } from '@/app/hooks';
import { useApartmentStore, useAuthStore, useRoomStore } from '@/app/store';
import { formatVND } from '@/configs/common-function';
import { path } from '@/configs/path';
import { Button, CircularProgress, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/img/logo.png';
import { roomAction } from '@/app/action/room.action';
import { Room } from '@/types/room.type';
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
    const apartmentId = url[url.length - 3];
    const { room, isLoadingRoom } = useRoomStore();
    const { apartment } = useApartmentStore();
    const { user } = useAuthStore();
    useEffect(() => {
        dispatch(roomAction.getById(roomId));
        dispatch(apartmentAction.getById(apartmentId));
    }, [user, roomId, apartmentId, dispatch]);
    console.log(room);

    const rentRoom = () => {
        navigate(path.room.contract.replace(':id', roomId));
    };

    const renderServices =
        room && room.serviceList
            ? room.serviceList.map((service: any, index) => {
                  console.log(service);
                  return (
                      <div key={index}>
                          {' '}
                          <div style={{ marginLeft: '1rem' }}>.{service.description}: </div>
                          <span style={{ marginLeft: '2rem' }}>
                          -{' '}{service.unitsUnitPrice[0].description}:{' '}
                              <b className="text-danger">
                                  {' '}
                                  {formatVND(Number(service.unitsUnitPrice[0].unitPrice))}
                              </b>
                          </span>
                      </div>
                  );
              })
            : [];

    return (
        <div className="container">
            <div className={`${classes.container}`}>
                {isLoadingRoom ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div className={`${classes.imgContainer}`}>
                                <img
                                    src={room?.imageUrls[0] || Logo}
                                    alt="#"
                                    className={classes.img}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={`${classes.body}`}>
                                <p className={`${classes.title}`}>{room?.nameOfRoom} </p>
                                <p className={``}>
                                    {new Date(apartment?.createdDate || '').toLocaleDateString(
                                        'en-US'
                                    )}{' '}
                                </p>
                                <p className={``}>Địa chỉ: {apartment?.address} </p>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        Giá phòng:{' '}
                                        <b className="text-danger">
                                            {formatVND(Number(room?.price))}
                                        </b>
                                    </Grid>
                                    <Grid item xs={4}>
                                        Diện tích: <b className="text-danger">{room?.acreage} m²</b>
                                    </Grid>
                                    <Grid item xs={4}>
                                        Kỳ hạn: <b className="text-danger">{room?.period} tháng</b>
                                    </Grid>
                                </Grid>
                                <p className={``}>Vị trí: Tầng {room?.floor || 'trệt'} </p>
                                <p className={``}>
                                    Trạng thái: {room?.available ? 'còn trống' : 'đã hết'}{' '}
                                </p>
                                <p> Phòng dành cho: {room?.numberOfPeople} người </p>
                                <p> Mô tả chi tiết: {room?.description} </p>

                                <div>Các dịch vụ hiện tại của phòng:</div>
                                <div>{renderServices}</div>

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
