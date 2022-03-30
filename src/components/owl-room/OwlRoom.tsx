import React from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from '@mui/material';

import ReactOwlCarousel from 'react-owl-carousel';
import { useNavigate } from 'react-router-dom';
import { path } from '../../configs/path';
import { makeStyles } from '@mui/styles';
import defaultRoomImage from '@/assets/img/findout-left.jpg';
import { Apartment } from '@/types/apartment.type';

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
        marginTop: 'auto',
    },
    '@keyframes animationDeposit': {
        '0%': {
            color: 'red',
        },
        '50%': {
            color: '#DDDDDD',
        },
        '75%': {
            color: 'yellow',
        },
        '100%': {
            color: 'red',
        },
    },
    deposit: {
        animationName: '$animationDeposit',
        animationIterationCount: 'infinite',
        animationDuration: '1s',
    },
});
interface Props {
    apartments: Array<Apartment>;
    isLoadingapartments: boolean;
    title: string;
}

const Owlapartment: React.FC<Props> = ({ apartments, isLoadingapartments, title }: Props) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const gotoSearching = (apartmentId: string) => {
        // navigate(path.apartment.byId.replace(':id', apartmentId));
    };

    const limitContent = (content: string, maximum: number) => {
        const MAXIMUM_LENGTH = maximum;
        return content.length > MAXIMUM_LENGTH ? content.slice(0, MAXIMUM_LENGTH) + '...' : content;
    };

    const owlDataMap = apartments.map((apartment: Apartment, index: number) => {
        return (
            <Card variant="outlined" key={index} className={classes.cardContainer}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    className={classes.cardMedia}
                    image={apartment.imageUrls[0] ?? defaultRoomImage}
                />
                <CardContent className={classes.cardMedia}>
                    <Typography gutterBottom variant="h5" component="div">
                        {limitContent(apartment.reminiscentName, 30)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <p>{limitContent(apartment.description, 150)}</p>
                        <p>
                            <b>Số phòng trống</b>:
                            <span className={classes.deposit}>{apartment.numberOfFloors} </span>
                        </p>
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <Button size="small" onClick={() => gotoSearching(apartment.id as string)}>
                        Chi tiết
                    </Button>
                </CardActions>
            </Card>
        );
    });

    return (
        <div style={{ marginTop: `5rem` }}>
            {isLoadingapartments ? (
                <CircularProgress />
            ) : (
                <React.Fragment>
                    {' '}
                    <p className="home-title mbot-3 ">{title}</p>
                    <ReactOwlCarousel className="owl-theme" margin={10} items={4} loop>
                        {owlDataMap}
                    </ReactOwlCarousel>{' '}
                </React.Fragment>
            )}
        </div>
    );
};

Owlapartment.propTypes = {};

export default Owlapartment;
