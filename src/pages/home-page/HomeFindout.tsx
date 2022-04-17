import React from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import room from '@/assets/img/room.webp';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
const useStyles = makeStyles({
    container: {
        backgroundColor: 'white',
        padding: '3rem 0',
    },
    left: {
        height: '700px',
        '& img': {
            height: '100%',
            width: '100%',
        },
    },
    right: {
        backgroundColor: '#1f1f1f',
        height: '100%',
        padding: '8rem 16rem 8rem 4rem',
        color: 'white',
    },
    title: {
        fontSize: '48px',
        fontweight: 'bold',
        marginTop: '1rem',
    },
    content: {
        marginTop: '4rem',
    },
});

const HomeFindout = () => {
    const classes = useStyles();

    const navigate = useNavigate();
    return (
        <div className={`${classes.container}`}>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <div className={`${classes.left}`}>
                        <img src={room} alt="#" />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={`${classes.right}`}>
                        <div>Tiện ích Houflex</div>
                        <div className={`${classes.title}`}>Việc tìm phòng trọ gặp khó khăn?</div>
                        <div className={`${classes.content}`}>
                            <p>Bạn muốn tìm kiếm phòng phù hợp với bản thân?</p>
                            <br />
                            <p>
                                Chúng tôi hiểu việc tìm kiếm một phòng trọ phù hợp là việc không dễ
                                dàng cho bất cứ ai sống ở một thành phố lớn và xa lạ. Vì thế chúng
                                tôi đã tạo nên Houflex!
                            </p>
                            <br />
                            <p>Đừng lo lắng! Chúng tôi sẽ hỗ trợ bạn.</p>
                            <Button> <ArrowRightAltIcon fontSize="medium" /> Tìm kiếm ngay </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default HomeFindout;
