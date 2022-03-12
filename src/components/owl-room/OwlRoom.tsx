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
import { Room } from '@/types/room.type';
import { formatVND } from '@/configs/common-function';
import defaultRoomImage from '@/assets/img/findout-left.jpg';

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
    rooms: Array<Room>;
    isLoadingRooms: boolean;
    title: string;
}

const OwlRoom: React.FC<Props> = ({ rooms, isLoadingRooms, title }: Props) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const gotoSearching = (roomId: string) => {
        navigate(path.room.byId.replace(':id', roomId));
    };

    const limitContent = (content: string, maximum: number) => {
        const MAXIMUM_LENGTH = maximum;
        return content.length > MAXIMUM_LENGTH ? content.slice(0, MAXIMUM_LENGTH) + '...' : content;
    };

    const owlDataMap = rooms.map((room: Room, index: number) => {
        return (
            <Card variant="outlined" key={index} className={classes.cardContainer}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    className={classes.cardMedia}
                    image={room.images[0] ?? defaultRoomImage}
                />
                <CardContent className={classes.cardMedia}>
                    <Typography gutterBottom variant="h5" component="div">
                        {limitContent(room.title, 30)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <p>{limitContent(room.description, 150)}</p>
                        <p>
                            <b> Giá </b>:
                            <span className={classes.deposit}>{formatVND(room.deposit)} </span>
                        </p>
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <Button size="small" onClick={() => gotoSearching(room.id)}>
                        Chi tiết
                    </Button>
                </CardActions>
            </Card>
        );
    });

    return (
        <div style={{ marginTop: `5rem` }}>
            {isLoadingRooms ? (
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

OwlRoom.propTypes = {};

export default OwlRoom;
