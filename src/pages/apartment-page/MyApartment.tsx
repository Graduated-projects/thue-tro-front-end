import { apartmentAction } from '@/app/action/apartment.action';
import { useAppDispatch } from '@/app/hooks';
import { useApartmentStore, useAuthStore } from '@/app/store';
import { Apartment } from '@/types/apartment.type';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { path } from '@/configs/path';

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
        cursor: `pointer`,
    },
    apartmentContainer: {
        boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
        margin: `1rem 0`,
        padding: `1rem 3rem`,
        display: `flex`,
        width: '50%',
        '&:nth-child(even)': {
            backgroundColor: '#dddddd',
        },
        '&:hover': {
            boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px`,
        },
    },
    title: {
        fontSize: `25px`,
        fontWeight: 'bold',
    },
});

const MyApartment = () => {
    const dispatch = useAppDispatch();
    const { apartments, isLoadingApartments } = useApartmentStore();
    const { user } = useAuthStore();
    const classes = useStyle();
    const navigate = useNavigate();
    console.log(apartments);

    useEffect(() => {
        dispatch(apartmentAction.getAll(0));
    }, [dispatch, user]);

    const apartmentsMap = apartments.map((apartment: Apartment, index: number) => {
        return (
            <div
                className={`${classes.apartmentContainer}`}
                key={index}
                onClick={() => navigate(path.apartment.byId.replace(':id', apartment?.id as string))}
            >
                <div className={`d-flex justify-content-center align-items-center w-100`}>
                    <div className={`${classes.title} mbot-5 center w-100`}>
                        {apartment.reminiscentName}
                    </div>
                    <div>
                        <b>Địa chỉ:</b> {apartment.address}
                    </div>
                    <div>
                        <b>Số tầng:</b> {apartment.numberOfFloors}
                    </div>
                    <div>
                        <b>Số phòng trống:</b>
                        <span className="text-danger"> {apartment.numberOfRoomsAvailable}</span>
                    </div>
                    <div>
                        <b>Tổng số phòng: </b>
                        {apartment.totalNumberOfRooms}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="container">
            {isLoadingApartments ? (
                <CircularProgress />
            ) : (
                <div className={`container`}>
                    <div className={`${classes.container} `}>
                        <Grid item xs={12} textAlign="center" className={`text-success ${classes.my}`}>
                            Tất cả căn hộ của tôi
                        </Grid>
                        {apartmentsMap}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApartment;
