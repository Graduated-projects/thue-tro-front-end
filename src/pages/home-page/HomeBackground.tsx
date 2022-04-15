import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

import bg from '@/assets/img/dark-background.png';
import roomBg from '@/assets/img/room.webp';
import roomBg2 from '@/assets/img/room2.jpg';
import roomBg3 from '@/assets/img/room3.jpg';
import roomBg4 from '@/assets/img/room4.jpg';
const useStyles = makeStyles({
    background: {
        background: `url(${bg})`,
        backgroundSize: 'contain',
        height: `700px`,
        backgroundAttachment: 'fixed',
        paddingTop: '6rem',
        zIndex: '0'
    },
    bgContainer: {},
    left: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        padding: '8rem 0 6rem 10rem',
    },
    title: {
        fontSize: '42px',
        fontWeight: 'bold',
        textShadow: '0 0 2px black  ',
    },
    content: {
        opacity: '0.8',
        textShadow: '0 0 2px black',
        fontSize: '24px',
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '5rem',
        paddingTop: '7rem',
        position: 'relative',
    },
    img: {
        width: '600px',
        height: '400px',
        clipPath: `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`,
    },
    img1: {
        width: '300px',
        height: '200px',
        clipPath: `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`,
        position: 'absolute',
        transform: `translate(0, -60px)`,
    },
    img2: {
        width: '300px',
        height: '200px',
        clipPath: `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`,
        position: 'absolute',
        transform: `translate(200px, -100px)`,
        zIndex: '6',
    },
    img3: {
        width: '300px',
        height: '200px',
        clipPath: `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`,
        position: 'absolute',
        transform: `translate(400px, -60px)`,
        zIndex: '7',
    },
    img4: {
        width: '300px',
        height: '200px',
        clipPath: `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`,
        position: 'absolute',
        transform: `translate(400px, 100px)`,
        zIndex: '8',
    },
});

const HomeBackground = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <div className={`${classes.background}`}>
            <div className={`${classes.bgContainer}`}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <div className={`${classes.left}`}>
                            <p className={`${classes.title}`}>
                                Tìm kiếm phòng trọ thông minh với Houflex
                            </p>
                            <p className={`${classes.content}`}>
                                Dễ dàng tìm kiếm phòng trọ với giá cả hợp lý. Phù hợp với mong muốn
                                người thuê và dễ dàng sử dụng.
                            </p>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/finding')}
                                style={{ width: `50%`, padding: '0.5rem 1rem', marginTop: '1rem' }}
                            >
                                <SearchIcon fontSize="inherit" /> &nbsp; Bắt đầu tìm kiếm
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <div className={`${classes.right}`}>
                            <img className={`${classes.img}`} src={roomBg} alt="" />
                            <img className={`${classes.img1}`} src={roomBg3} alt="" />
                            <img className={`${classes.img2}`} src={roomBg2} alt="" />
                            <img className={`${classes.img4}`} src={roomBg4} alt="" />
                            <img className={`${classes.img3}`} src={roomBg} alt="" />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

HomeBackground.propTypes = {};

export default HomeBackground;
