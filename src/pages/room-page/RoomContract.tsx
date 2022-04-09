import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RoomRules from './RoomRules';
import RoomContractCreated from './RoomContractCreated';
import RoomContractPayMethod from './RoomContractPayMethod';
const useStyle = makeStyles({
    container: {
        padding: `4rem 2rem`,
        boxShadow:
            'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
        margin: '2rem 0',
        borderRadius: '7.5px',
    },

    body: {
        padding: '1rem',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
});
const RoomContract = () => {
    const classes = useStyle();
    const [createContractStep, setcreateContractStep] = useState(0);

    return (
        <div className="container">
            <Grid container spacing={2} className={`${classes.container}`}>
                {createContractStep === 0 && <RoomRules setStep={setcreateContractStep} />}
                {createContractStep === 1 && (
                    <RoomContractCreated setStep={setcreateContractStep} />
                )}
                {createContractStep === 2 && (
                    <RoomContractPayMethod setStep={setcreateContractStep} />
                )}
            </Grid>
        </div>
    );
};

export default RoomContract;
