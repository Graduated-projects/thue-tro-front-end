import { Grid } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
            <Grid container spacing={10} justifyContent="space-between">
                <Grid item lg={6}>
                    <span> @ Phát triển bỡi: Đạt Ma XM (2022) </span>
                </Grid>
                <Grid item lg={6} container justifyContent="flex-end">
                    <span> Thắc mắc liên hệ: (+84) 912 366 093 </span>
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
