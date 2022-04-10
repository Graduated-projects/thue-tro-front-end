import React from 'react';

import { styled } from '@mui/material/styles';
import { Slider } from '@mui/material';

const PriceSlider = styled(Slider)(({ theme }) => ({
    color: 'yellow',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: 'yellow',
        boxShadow:
            '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
        '&:focus, &:hover, &.Mui-active': {
            boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow:
                    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
            },
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 14,
        fontWeight: 'normal',
        top: -6,
        backgroundColor: 'dark',
        color: 'white',
        '&:before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: 'white',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#bfbfbf',
        height: 10,
        width: 1,
        '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: 'yellow',
        },
    },
}));

export default PriceSlider;
