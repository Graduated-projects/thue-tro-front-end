import React, { useEffect, useState } from 'react';
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
import BackButton from '@/components/BackButton';
const useStyle = makeStyles({
    container: {
        padding: `4rem 0`,
    },
    imgContainer: {
        padding: '1rem',
        backgroundColor: 'white',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    block: {
        backgroundColor: 'white',
        margin: '0 0 16px 0',
        padding: '16px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    leftTitle: {
        color: '#17a2b8',
        fontsize: '16px',
        marginRight: '0.25rem',
    },
    services: {
        paddingTop: '1rem',
        borderTop: '2px dashed black',
    },
    eachService: {
        margin: '0.5rem 0',
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

    console.log(room);

    useEffect(() => {
        dispatch(roomAction.getById(roomId));
        dispatch(apartmentAction.getById(apartmentId));
    }, [user, roomId, apartmentId, dispatch]);

    const rentRoom = () => {
        navigate(path.room.contract.replace(':id', roomId));
    };

    const renderServices =
        room && room.serviceList
            ? room.serviceList.map((service: any, index) => {
                  return (
                      <div key={index} className={`${classes.eachService}`}>
                          <div style={{ marginLeft: '1rem' }} className={`${classes.leftTitle}`}>
                              .{service.description}:
                          </div>
                          <span style={{ marginLeft: '2rem' }}>
                              - {service.unitsUnitPrice[0].description}:
                              <b className="text-danger">
                                  {formatVND(Number(service.unitsUnitPrice[0].unitPrice))}
                              </b>
                          </span>
                      </div>
                  );
              })
            : [];

    const renderImage = () => {
        if (room?.imageUrls) return room.imageUrls[0];
        return Logo;
    };

    const isOwner = () => {
        return Number(room?.createdBy) === Number(user?.id) ? true : false;
    };

    return (
        <div className="container">
            <div className={`${classes.container}`}>
                <BackButton />
                {isLoadingRoom ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div className={`${classes.imgContainer}`}>
                                <img src={renderImage()} alt="#" className={classes.img} />
                            </div>
                        </Grid>

                        <Grid item xs={5}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className={classes.block}>
                                        <p className={`${classes.title}`}>
                                            Phòng {room?.nameOfRoom}
                                        </p>
                                        <p className={``}>
                                            <span className={`${classes.leftTitle}`}>
                                                Ngày đăng:
                                            </span>
                                            {new Date(
                                                apartment?.createdDate || ''
                                            ).toLocaleDateString('en-US')}
                                        </p>
                                        <p className={``}>
                                            <span className={`${classes.leftTitle}`}>
                                                Trạng thái:
                                            </span>
                                            {room?.available ? (
                                                <span className="text-success">Còn trống</span>
                                            ) : (
                                                <span className="text-danger">Đã hết phòng</span>
                                            )}
                                        </p>
                                        <p className={``}>
                                            <span className={`${classes.leftTitle}`}>Địa chỉ:</span>
                                            <b> {apartment?.address}</b>
                                        </p>
                                    </div>
                                </Grid>
                            </Grid>

                            <div className={classes.block}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <span className={`${classes.leftTitle}`}> Giá phòng:</span>
                                        <b className="text-danger">
                                            {formatVND(Number(room?.price))}
                                        </b>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <span className={`${classes.leftTitle}`}> Diện tích:</span>
                                        <b className="text-danger">{room?.acreage} m²</b>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <span className={`${classes.leftTitle}`}> Kỳ hạn:</span>
                                        <b className="text-danger">
                                            {Math.ceil(Number(room?.period) / 30)} tháng
                                        </b>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <span className={`${classes.leftTitle}`}>Vị trí:</span> Tầng
                                        {room?.floor || ' trệt'}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span className={`${classes.leftTitle}`}>
                                            Phòng dành cho:
                                        </span>
                                        {room?.numberOfPeople} người
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            onClick={() => rentRoom()}
                                            disabled={isOwner()}
                                        >
                                            Thuê phòng
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.block}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <p>
                                            <span className={`${classes.leftTitle}`}>
                                                Mô tả chi tiết:
                                            </span>
                                            {room?.description}
                                        </p>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className={classes.block}>
                                        <p className={``}>
                                            <span className={`${classes.leftTitle}`}>
                                                {' '}
                                                Người Đăng:
                                            </span>
                                            {apartment?.owner?.fullName}
                                        </p>
                                        <p className={``}>
                                            <span className={`${classes.leftTitle}`}> SDT:</span>
                                            {apartment?.owner?.phoneNumber}
                                        </p>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.block}>
                                        <div className={`${classes.services}`}>
                                            <span className={`${classes.leftTitle}`}>
                                                Các dịch vụ hiện tại của phòng:
                                            </span>
                                        </div>
                                        <div>{renderServices}</div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </div>
        </div>
    );
};

export default RoomByDepartmentId;
