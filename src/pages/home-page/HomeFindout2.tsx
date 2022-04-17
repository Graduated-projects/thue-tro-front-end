import React from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import room from '@/assets/img/room.webp';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import whiteback from '@/assets/img/white-background.webp';
const useStyles = makeStyles({
    container: {
        backgroundColor: '#1f1f1f',
        padding: '3rem 0',
    },
    right: {
        height: '700px',
        '& img': {
            height: '100%',
            width: '100%',
        },
    },
    left: {
        background: `url(${whiteback})`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
        height: '100%',
        padding: '8rem 16rem 8rem 4rem',
        color: 'black',
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

const HomeFindout2 = () => {
    const classes = useStyles();

    const navigate = useNavigate();
    return (
        <div className={`${classes.container}`}>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <div className={`${classes.left}`}>
                        <div>Dành cho chủ nhà</div>
                        <div className={`${classes.title}`}>Quản lý việc cho thuê thuận tiện</div>
                        <div className={`${classes.content}`}>
                            <p>
                                Houflex hổ trợ tạo hợp đồng thuê nhà để dễ dàng hơn trong việc quản
                                lý.
                            </p>
                            <br />
                            <p>
                                Chúng tôi cũng hỗ trợ trong việc chuyển tiền giữa các bên. Việc này
                                được xác thực bởi cơ chế blockchain nên sẽ giúp việc xác thực giao
                                dịch được đảm bảo an toàn.
                            </p>
                            <br />
                            <p>Đừng lo lắng! Chúng tôi sẽ hỗ trợ bạn.</p>
                            <Button>
                                {' '}
                                <ArrowRightAltIcon fontSize="medium" /> Thử tạo phòng ngay
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={`${classes.right}`}>
                        <img src={room} alt="#" />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default HomeFindout2;
