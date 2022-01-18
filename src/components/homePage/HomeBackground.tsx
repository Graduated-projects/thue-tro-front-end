import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
const HomeBackground = () => {
    const navigate = useNavigate();
    return (
        <div className="home-background center-column">
            <p className="text-light text-super mbot-1">Tìm kiếm phòng trọ thông minh</p>
            <p className="text-light text-super mbot-1">Houflex</p>

            <Button variant="contained" onClick={() => navigate('/finding')}>
                <SearchIcon /> Bắt đầu tìm kiếm
            </Button>
        </div>
    );
};

HomeBackground.propTypes = {};

export default HomeBackground;
