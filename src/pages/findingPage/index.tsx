import { Grid } from '@mui/material';
import React from 'react';
import FilterLocation from './FilterLocation';
import SearchingMap from './SearchingMap';

const index = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <SearchingMap />
                </Grid>
                <Grid item xs={4} className="mt-5">
                    <FilterLocation />
                </Grid>
            </Grid>
        </>
    );
};

export default index;
