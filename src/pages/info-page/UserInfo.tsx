import { makeStyles } from '@mui/styles';
import { customContainer } from '@/configs/styles';
import React, { useEffect } from 'react';
import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthStore } from '@/app/store';
import { formatPhone, formatVND } from '@/configs/common-function';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { path } from '@/configs/path';

const useStyles = makeStyles({
    customContainer,
    userInfoContainer: {
        boxShadow: '0 0 5px #dddddd',
        borderRadius: '7.5px',
        fontSize: '20px',
        backgroundColor: 'white',
    },
    title: {
        fontWeight: 'bold',
        width: '180px',
    },
    userImage: {
        fontSize: '150px',
    },
    userInfo: {
        display: `flex`,
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    wallet: {
        fontSize: '100px',
        color: 'yellow',
    },
    walletTitle: {
        fontWeight: 'bold',
        color: '',
    },
    depositMoney: {
        marginBottom: '16px',
        color: 'blue',
        cursor: 'pointer',
    },
    '@keyframes animationDeposit': {
        '0%': {
            color: 'red',
        },
        '50%': {
            color: 'blue',
        },
        '75%': {
            color: 'red',
        },
        '100%': {
            color: 'blue',
        },
    },
    deposit: {
        animationName: '$animationDeposit',
        animationIterationCount: 'infinite',
        animationDuration: '2s',
    },
});

const UserInfo = () => {
    const classes = useStyles();
    const { user, isLogin } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) navigate(path.main.home);
    }, []);

    return (
        <div className={classes.customContainer}>
            <Grid container spacing={2}>
                <Grid item xs={4} className={`${classes.userInfo}`}>
                    <div className={`${classes.userInfoContainer} w-75`}>
                        <div className="center" style={{ flexDirection: 'column' }}>
                            <AccountCircleIcon className={classes.userImage} />
                            <p>Xin Chào!</p>
                            <p>
                                <b> {user?.fullName} </b>
                            </p>
                        </div>
                    </div>
                    <div className={`${classes.userInfoContainer} w-75 mt-3`}>
                        <div className="center" style={{ flexDirection: 'column' }}>
                            <LocalAtmRoundedIcon className={classes.wallet} />
                            <div>Ví H-flex của tôi</div>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}
                                        >
                                            <TableCell
                                                className={classes.walletTitle}
                                                align="right"
                                            >
                                                Số dư:
                                            </TableCell>
                                            <TableCell align="left">
                                                {' '}
                                                {formatVND(1000000)}{' '}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className={`${classes.depositMoney} ${classes.deposit}`}>
                                <PaidOutlinedIcon fontSize="inherit" /> &nbsp; Nạp tiền vào ví
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer className={`${classes.userInfoContainer}`}>
                        <Table>
                            <TableBody>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell className={classes.title}>số CMND/CCCD:</TableCell>
                                    <TableCell align="left"> {user?.idCardNo} </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell className={classes.title}>Email:</TableCell>
                                    <TableCell align="left"> {user?.email} </TableCell>
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
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell className={classes.title}>ngày sinh:</TableCell>
                                    <TableCell align="left"> {user?.dateOfBirth} </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell className={classes.title}>Giới tính:</TableCell>
                                    <TableCell align="left"> {user?.gender} </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer className={`${classes.userInfoContainer} mt-3`}>
                        <Table>
                            <TableHead style={{ backgroundColor: '#1976d2' }}>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        colSpan={2}
                                        style={{ fontSize: '24px', color: 'white' }}
                                    >
                                        {' '}
                                        Menu người dùng{' '}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell align="center">
                                        {' '}
                                        <Button
                                            variant="contained"
                                            onClick={() => navigate(path.apartment.my)}
                                        >
                                            <HomeIcon /> &nbsp; Xem căn hộ của tôi
                                        </Button>{' '}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => navigate(path.contract.my)}
                                        >
                                            <DocumentScannerOutlinedIcon /> &nbsp; Xem Hợp đồng của
                                            tôi
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell align="center">
                                        {' '}
                                        <Button
                                            variant="contained"
                                            onClick={() => navigate(path.contract.other)}
                                            color="success"
                                        >
                                            <ReceiptLongOutlinedIcon /> &nbsp; Xem Hợp đồng khác
                                        </Button>{' '}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserInfo;
