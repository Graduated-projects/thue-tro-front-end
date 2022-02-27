import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import ReactOwlCarousel from 'react-owl-carousel';
import { owlData } from '../../configs/location';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../configs/path';
import { useDispatch } from 'react-redux';
import { setLocationSlice } from '../../app/slice/location.slice';
import { LocationSearching } from '@/types/location.type';
import { DistrictOwl } from '@/types/interface';

const HomeOwlCarousel: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            <div className="item" key={index}>
                <Card variant="outlined" style={{ minHeight: '380px', maxHeight: '500px' }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={district.imgUrl}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {district.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {district.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => gotoSearching(district)}>
                            Tìm phòng trọ khu vực này
                        </Button>
                    </CardActions>
                </Card>
            </div>
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
