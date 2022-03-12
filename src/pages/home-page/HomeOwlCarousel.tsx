import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import ReactOwlCarousel from 'react-owl-carousel';
import { owlData } from '../../configs/location';
import { useNavigate } from 'react-router-dom';
import { path } from '../../configs/path';
import { useDispatch } from 'react-redux';
import { setLocationSlice } from '../../app/slice/location.slice';
import { LocationSearching } from '@/types/location.type';
import { DistrictOwl } from '@/types/interface';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    cardContainer: {
        height: '480px',
    },
    cardMedia: {
        height: '200px',
    },
    cardContent: {
        height: '320px',
    },
    cardAction: {
        marginTop: 'auto'
    },
});

const HomeOwlCarousel: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const gotoSearching = (district: DistrictOwl) => {
        const locationSearching: LocationSearching = {
            place: {
                name: district.title,
                position: district.latlng,
            },
            radius: 0,
            zoom: 12,
            unit: 0,
        };
        dispatch(setLocationSlice(locationSearching));
        navigate(path.main.finding);
    };
    const owlDataMap = owlData.map((district: DistrictOwl, index: number) => {
        return (
            <Card variant="outlined" key={index} className={classes.cardContainer}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    className={classes.cardMedia}
                    image={district.imgUrl}
                />
                <CardContent className={classes.cardMedia}>
                    <Typography gutterBottom variant="h5" component="div">
                        {district.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {district.content}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <Button size="small" onClick={() => gotoSearching(district)}>
                        Tìm phòng trọ khu vực này
                    </Button>
                </CardActions>
            </Card>
        );
    });

    return (
        <div style={{ marginTop: `5rem` }}>
            <p className="home-title mbot-3 ">Bạn muốn tìm kiếm ở đâu?</p>
            <ReactOwlCarousel className="owl-theme" margin={10} items={4} loop>
                {owlDataMap}
            </ReactOwlCarousel>
        </div>
    );
};

HomeOwlCarousel.propTypes = {};

export default HomeOwlCarousel;
