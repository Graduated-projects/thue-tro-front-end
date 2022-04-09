import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
    Grid,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Table,
    TableContainer,
    Paper,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { path } from '@/configs/path';
import { formatVND } from '@/configs/common-function';

const useStyle = makeStyles({
    container: {
        width: '50%',
        boxShadow:
            'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
        margin: '2rem 0',
        borderRadius: '7.5px',
        padding: '0 16px 16px 0',
    },
    notify: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    tableHeader: {
        backgroundColor: '#1976d2',
    },
    headerElement: {
        color: 'white',
        fontSize: '24px',
    },
});

const RoomContractSuccess = () => {
    const classes = useStyle();
    const url = window.location.href.split('/');
    const data = url[url.length - 1];
    const navigate = useNavigate();
    const [paymentInfo, setpaymentInfo] = useState<any>({
        vnp_Amount: 0,
        vnp_BankCode: '',
        vnp_BankTranNo: '',
        vnp_CardType: '',
        vnp_OrderInfo: '',
        vnp_PayDate: '',
        vnp_ResponseCode: '',
        vnp_TmnCode: '',
        vnp_TransactionStatus: '',
        vnp_SecureHash: '',
    });

    useEffect(() => {
        const basicLength = 'payment-success'.length;
        if (data.length > basicLength) {
            sessionStorage.setItem('dataPaymentSuccess', window.location.href);
            navigate(path.room.success);
        }
    }, []);

    useEffect(() => {
        const paymentSession = sessionStorage.getItem('dataPaymentSuccess') || window.location.href;
        const url = new URL(paymentSession);
        const paymentInfoClone = {
            ...paymentInfo,
            vnp_Amount: url.searchParams.get('vnp_Amount') || '',
            vnp_BankCode: url.searchParams.get('vnp_BankCode') || '',
            vnp_BankTranNo: url.searchParams.get('vnp_BankTranNo') || '',
            vnp_CardType: url.searchParams.get('vnp_CardType') || '',
            vnp_OrderInfo: url.searchParams.get('vnp_OrderInfo') || '',
            vnp_PayDate: url.searchParams.get('vnp_PayDate') || '',
            vnp_ResponseCode: url.searchParams.get('vnp_ResponseCode') || '',
            vnp_TmnCode: url.searchParams.get('vnp_TmnCode') || '',
            vnp_TransactionStatus: url.searchParams.get('vnp_TransactionStatus') || '',
            vnp_SecureHash: url.searchParams.get('vnp_SecureHash') || '',
        };
        setpaymentInfo(paymentInfoClone);
    }, []);

    const formatDMY = (string: string) => {
        const year = string.slice(0, 4);
        const month = string.slice(4, 6);
        const date = string.slice(6, 8);

        const hour = string.slice(8, 10);
        const minute = string.slice(10, 12);
        const seconds = string.slice(12, 14);

        return `${date}-${month}-${year} ${hour}:${minute}:${seconds}`;
    };

    return (
        <div className="container center">
            <Grid container spacing={2} className={`${classes.container}`}>
                <Grid item xs={12} className={classes.notify} textAlign="center">
                    Thanh toán thành công!
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className={classes.tableHeader}>
                                    <TableCell
                                        align="center"
                                        className={classes.headerElement}
                                        colSpan={2}
                                    >
                                        Nội dung thanh toán
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">Số tiền thanh toán</TableCell>
                                    <TableCell>
                                        {formatVND(Number(paymentInfo.vnp_Amount) / 100)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Mã ngân hàng</TableCell>
                                    <TableCell>{paymentInfo.vnp_BankCode}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Mã giao dịch</TableCell>
                                    <TableCell>{paymentInfo.vnp_BankTranNo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Loại thẻ</TableCell>
                                    <TableCell>{paymentInfo.vnp_CardType}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Nội dung</TableCell>
                                    <TableCell>{paymentInfo.vnp_OrderInfo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Ngày thanh toán</TableCell>
                                    <TableCell>{formatDMY(paymentInfo.vnp_PayDate)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">mã phản hồi</TableCell>
                                    <TableCell>{paymentInfo.vnp_ResponseCode}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Trạng thái</TableCell>
                                    <TableCell>
                                        {paymentInfo.vnp_TransactionStatus === '00'
                                            ? ` Thành công `
                                            : 'Thất bại'}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <Button variant="contained">Xác nhận</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default RoomContractSuccess;
