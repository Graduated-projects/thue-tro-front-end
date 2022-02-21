import React from 'react';
import PropTypes from 'prop-types';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import ReactOwlCarousel from 'react-owl-carousel';
  import { owlData } from '../../configs/location';
//   import { owlData } from '@/configs/location';

interface DistrictOwl {
    title: string,
    content: string,
    imgUrl: string
}

const HomeOwlCarousel: React.FC = () => {

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
                        <Button size="small" onClick={() => console.log(`e`)}>
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
