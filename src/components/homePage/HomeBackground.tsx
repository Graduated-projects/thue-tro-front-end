import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const HomeBackground = () => {
    return (
        <div className="home-background center-column">
            <p className="text-light text-super mbot-1">Tìm kiếm phòng trọ thông minh</p>
            <p className="text-light text-super mbot-1">Houflex</p>

            <Button variant="contained">
                <SearchIcon /> Bắt đầu tìm kiếm
            </Button>
        </div>
    );
};

HomeBackground.propTypes = {};

export default HomeBackground;
