import { makeStyles } from '@mui/styles';
import { customContainer } from '@/configs/styles';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthStore } from '@/app/store';
import { fireErrorMessage, formatPhone, formatVND } from '@/configs/common-function';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import HistoryIcon from '@mui/icons-material/History';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import { path } from '@/configs/path';
import { walletService } from '@/services/wallet.service';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NumericInput from 'material-ui-numeric-input';
import { PAYMENT_STORAGE } from '@/configs/const';
import { authService } from '@/services/auth.service';

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
        fontSize: '150px !important',
    },
    userInfo: {
        display: `flex`,
        flexDirection: 'column',
        alignItems: 'flex-end',
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
        marginLeft: '16px',
        color: 'blue',
        cursor: 'pointer',
        fontSize: '16px',
    },

    button: {
        width: '250px',
    },
    recharge: {
        '&:hover': {
            color: 'red',
        },
        margin: '0.5rem 0',
    },
});

const UserInfo = () => {
    const classes = useStyles();
    const { user, isLogin } = useAuthStore();
    const navigate = useNavigate();
    const [balanceInWallet, setbalanceInWallet] = useState(0);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        if (!isLogin) navigate(path.main.home);

        walletService
            .getBalanceInWallet()
            .then((resp) => {
                if (resp.data.success) setbalanceInWallet(resp.data.data.balance);
            })
            .catch((err) => console.error(err));
    }, []);

    const rechargeMoney = () => {
        MySwal.fire({
            title: 'Nạp tiền vào ví H-flex',
            html: (
                <div>
                    <p>Nhập số tiền muốn nạp:</p>
                    <br></br>
                    <NumericInput
                        precision={0}
                        decimalChar=","
                        thousandChar="."
                        className={`w-75`}
                        label="Số tiền: VND"
                        variant="outlined"
                        onChange={(e) =>
                            sessionStorage.setItem(
                                PAYMENT_STORAGE,
                                Number(e.target.value).toString()
                            )
                        }
                    />
                </div>
            ),
            icon: 'info',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'hủy',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(path.wallet.paymentMethod);
            }
        });
    };

    const withdrawMoney = () => {
        MySwal.fire({
            title: 'Rút tiền từ H-flex về paypal',
            html: (
                <div>
                    <p>Nhập số tiền muốn rút:</p>
                    <br></br>
                    <NumericInput
                        precision={0}
                        decimalChar=","
                        thousandChar="."
                        className={`w-75`}
                        label="Số tiền: VND"
                        variant="outlined"
                        onChange={(e) =>
                            sessionStorage.setItem(
                                PAYMENT_STORAGE,
                                Number(e.target.value).toString()
                            )
                        }
                    />
                </div>
            ),
            icon: 'info',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'hủy',
            showCancelButton: true,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    authService.genOtp({
                        email: user?.email,
                        type: 2,
                    });
                    return Promise.resolve();
                }
                return Promise.reject();
            })
            .then(() => {
                MySwal.fire({
                    title: 'Xác thực',
                    html: (
                        <div>
                            <p>
                                Chúng tôi đã gửi mã OTP về mail:<b> {user?.email} </b>
                            </p>
                            <br></br>
                            <TextField
                                placeholder="Nhập mã OTP"
                                label="Mã OTP"
                                spellCheck={false}
                                onChange={(e) => sessionStorage.setItem('otp', e.target.value)}
                            />
                        </div>
                    ),
                    icon: 'info',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'hủy',
                    showCancelButton: true,
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            const otp = sessionStorage.getItem('otp');
                            return authService
                                .verifyEmail({ email: user?.email, otp }, 2)
                                .then((resp) => {
                                    if (resp.data.data.success) {
                                        return Promise.resolve();
                                    } else {
                                        fireErrorMessage('OTP không hợp lệ!');
                                        return Promise.reject();
                                    }
                                });
                        }
                        return Promise.reject();
                    })
                    .then(() => {
                        const cost = Number(sessionStorage.getItem(PAYMENT_STORAGE));
                        if (cost)
                            walletService
                                .withdrawPaypal(cost)
                                .then((resp) => {
                                    setbalanceInWallet((balance) => balance - cost);
                                    MySwal.fire({
                                        title: 'Thành công',
                                        html: (
                                            <div>
                                                <p>Rút tiền từ ví H-flex thành công.</p>
                                                <p>
                                                    Số tiền rút:
                                                    <b className="text-danger">{formatVND(cost)}</b>
                                                </p>
                                                <p>
                                                    Tài khoản còn lại:
                                                    <b> {formatVND(balanceInWallet - cost)}</b>
                                                </p>
                                            </div>
                                        ),
                                        icon: 'success',
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Xác nhận',
                                    });
                                })
                                .catch((err) => {
                                    console.error(err);
                                    fireErrorMessage(err);
                                });
                    });
            });
    };

    return (
        <div className={classes.customContainer}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <div className={`${classes.userInfo}`}>
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
                                                    '&:last-child td, &:last-child th': {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell
                                                    className={classes.walletTitle}
                                                    align="right"
                                                >
                                                    Số dư:
                                                </TableCell>
                                                <TableCell align="left">
                                                    {formatVND(balanceInWallet)}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div className={`${classes.depositMoney}`}>
                                    <div
                                        className={classes.recharge}
                                        onClick={() => rechargeMoney()}
                                    >
                                        <ArrowRightAltIcon fontSize="inherit" /> Nạp tiền vào ví
                                    </div>
                                    <div
                                        className={classes.recharge}
                                        onClick={() => withdrawMoney()}
                                    >
                                        <ArrowLeftIcon fontSize="inherit" /> Rút tiền
                                    </div>
                                </div>
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
                                        Menu người dùng
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
                                        <Button
                                            variant="contained"
                                            className={`${classes.button}`}
                                            onClick={() => navigate(path.apartment.my)}
                                        >
                                            <HomeIcon /> &nbsp; Xem căn hộ của tôi
                                        </Button>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            className={`${classes.button}`}
                                            onClick={() => navigate(path.apartment.post)}
                                            color="info"
                                        >
                                            <AddCircleIcon fontSize="small" /> &nbsp; Tạo căn hộ mới
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            className={`${classes.button}`}
                                            onClick={() => navigate(path.contract.other)}
                                            color="success"
                                        >
                                            <ReceiptLongOutlinedIcon /> &nbsp; Xem Hợp đồng khác
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            className={`${classes.button}`}
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
                                        <Button
                                            variant="contained"
                                            className={`${classes.button}`}
                                            onClick={() => navigate(path.auth.changePassword)}
                                            color="secondary"
                                        >
                                            <LockResetIcon /> &nbsp; Đổi mật khẩu
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            className={`${classes.button}`}
                                            onClick={() => navigate(path.wallet.history)}
                                            color="error"
                                        >
                                            <HistoryIcon /> &nbsp; Xem Lịch Sử Giao Dịch
                                        </Button>
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
