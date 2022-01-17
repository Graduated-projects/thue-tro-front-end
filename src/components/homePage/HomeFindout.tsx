import React from 'react';
import { Grid, Button } from '@mui/material';

const HomeFindout = () => {
    return (
        <>
            <p className="home-title mbot-3 ">Tìm trọ thông minh với Houflex</p>
            <Grid container spacing={2}>
                <Grid item lg={6}>
                    <div className="home-findout home-findout__left">
                        <p className="text-super"> Bạn muốn tìm kiếm một nhà trọ đẹp?</p>
                        <Button
                            size="large"
                            variant="contained"
                            color="inherit"
                            className="text-dark mt-3"
                        >
                            Tìm Kiếm ngay
                        </Button>
                    </div>
                </Grid>
                <Grid item lg={6}>
                    <div className="home-findout home-findout__right">
                        <p className="text-super"> Chọn lọc kỹ các yếu tố:</p>
                        <p className="text-super"> - Giá cả</p>
                        <p className="text-super"> - Địa điểm</p>
                        <p className="text-super"> - An ninh</p>
                        <Button
                            size="large"
                            variant="contained"
                            color="inherit"
                            className="text-dark mt-3"
                        >
                            Tìm Kiếm ngay
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default HomeFindout;
