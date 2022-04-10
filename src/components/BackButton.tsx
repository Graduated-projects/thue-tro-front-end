import { Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Grid xs={12} className='mt-3 mbot-3' textAlign="left">
            <Button variant="contained" color="inherit" onClick={() => navigate(-1)}>
                <KeyboardArrowLeftIcon /> &nbsp; Quay lại
            </Button>
        </Grid>
    );
};

export default BackButton;
