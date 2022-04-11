import { apartmentAction } from '@/app/action/apartment.action';
import { useAppDispatch } from '@/app/hooks';
import { useApartmentStore, useAuthStore } from '@/app/store';
import { Apartment } from '@/types/apartment.type';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { path } from '@/configs/path';
import Logo from '@/assets/img/logo.png';
import { limitString } from '@/configs/common-function';
import BackButton from '@/components/BackButton';

const useStyle = makeStyles({
    my: {
        fontSize: `30px`,
        fontWeight: 'bold',
    },
    container: {
        padding: `4rem 0`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: `25px`,
        fontWeight: 'bold',
    },
    img: {
        width: '100%',
        height: '150px',
        margin: '0.25rem',
    },
    cardContainer: {
        boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
        cursor: `pointer`,


    },
    cardMedia: {
        height: '150px',
    },
    cardContent: {
    },
    cardAction: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center'
    },
});

const MyApartment = () => {
    const dispatch = useAppDispatch();
    const { apartments, isLoadingApartments } = useApartmentStore();
    const { user, isLogin } = useAuthStore();
    const classes = useStyle();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) navigate(path.main.home);
    }, []);

    useEffect(() => {
        dispatch(apartmentAction.getAll(0));
    }, [dispatch, user]);
    console.log(apartments);

    const apartmentsMap = apartments.map((apartment: Apartment, index: number) => {
        console.log(apartment.imageUrls[0]);
        
        return (
            <Grid item xs={3} key={index}>
                <Card variant="outlined" key={index} className={classes.cardContainer}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        className={classes.cardMedia}
                        image={apartment.imageUrls[0] || Logo}
                    />
                    <CardContent className={classes.cardMedia}>
                        <Typography gutterBottom component="div"  textAlign="center">
                            <span style={{ fontSize: '16px', fontWeight: 'bold', lineHeight: 0.7 }}>
                                {limitString(apartment.address, 70)}
                            </span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <React.Fragment>
                                <div>
                                    Số tầng: <b> {apartment.numberOfFloors}</b>
                                </div>
                                <div>
                                    Tổng số phòng: <b> {apartment.totalNumberOfRooms}</b>
                                </div>
                                <div>
                                    Số phòng trống: <b> {apartment.numberOfRoomsAvailable}</b>
                                </div>
                                <div>
                                    Ngày đăng:
                                    <b>
                                        {new Date(apartment?.createdDate || '').toLocaleDateString(
                                            'en-US'
                                        )}
                                    </b>
                                </div>
                                <div>Mô tả: {limitString(apartment.description, 50)}</div>
                            </React.Fragment>
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <Button
                            size="small"
                            onClick={() =>
                                navigate(
                                    path.apartment.byId.replace(':id', apartment?.id as string)
                                )
                            }
                           
                        >
                            Xem chi tiết
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    });

    return (
        <div className="container">
            <BackButton />
            {isLoadingApartments ? (
                <CircularProgress />
            ) : (
                <div className={`container`}>
                    <div className={`${classes.container} `}>
                        <Grid
                            item
                            xs={12}
                            textAlign="center"
                            className={`text-success ${classes.my}`}
                        >
                            Tất cả căn hộ của tôi
                        </Grid>
                        <Grid container spacing={2}>
                            {apartmentsMap}
                        </Grid>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApartment;
