import { makeStyles } from '@mui/styles';
import { customContainer } from '@/configs/styles';
import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthStore } from '@/app/store';
import { formatPhone } from '@/configs/common-function';

const useStyles = makeStyles({
    customContainer,
    userInfoContainer: {
        boxShadow: '0 0 5px #dddddd',
        borderRadius: '7.5px',
        marginTop: '3rem',
        fontSize: '20px',
        marginBottom: '35vh'
    },
    title: {
        fontWeight: 'bold',
    },
});

const UserInfo = () => {
    const classes = useStyles();
    const { user } = useAuthStore();

    return (
        <Grid
            className={classes.customContainer}
            container
            spacing={2}
            justifyContent="center"
            direction="row"
        >
            <Grid
                item
                xs={5}
                container
                spacing={2}
                justifyContent="center"
                direction="row"
                alignItems="center"
                className={`${classes.userInfoContainer}`}
            >
                <Grid item xs={12} textAlign="center">
                    <AccountCircleIcon fontSize="large" />
                </Grid>
                <p>Thông tin cá nhân</p>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell className={classes.title}>Họ và tên:</TableCell>
                                    <TableCell align="left"> {user?.fullName} </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell className={classes.title}>Giới tính:</TableCell>
                                    <TableCell align="left"> {user?.gender} </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell className={classes.title}>Số điện thoại:</TableCell>
                                    <TableCell align="left">
                                        {formatPhone(user?.phoneNumber)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserInfo;
