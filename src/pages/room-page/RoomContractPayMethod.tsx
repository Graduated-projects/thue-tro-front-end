import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';

import Vnpay from '@/assets/img/bank-logo/vnpay.png';
import Logo from '@/assets/img/logo.png';

import VCB from '@/assets/img/bank-logo/vcb-logo.jpg';
import NCB from '@/assets/img/bank-logo/ncb-logo.jpg';
import AGRI from '@/assets/img/bank-logo/agribank.jpg';
import Swal from 'sweetalert2';
import { contractService } from '@/services/contract.service';
import { fireErrorMessage } from '@/configs/common-function';

interface Props {
    setStep: any;
}
const useStyle = makeStyles({
    container: {
        paddingBottom: '1rem',
        cursor: 'pointer',
    },

    img: {
        width: '100%',
        height: '50px',
        border: '1px solid black',
        '&:hover': {
            boxShadow: '0 0 5px black',
        },
    },
    title: {
        fontWeight: 'bold',
        fontSize: '24px',
        marginBottom: '1rem',
    },
});
const RoomContractPayMethod = ({ setStep }: Props) => {
    const classes = useStyle();
    const [paymentStatus, setpaymentStatus] = useState(0);

    const payMethods = [
        { id: 0, imgUrl: Vnpay, title: 'VNPAY' },
        { id: 1, imgUrl: Logo, title: 'Ví của tôi' },
    ];

    const banks = [
        { id: 0, imgUrl: NCB, value: 'NCB', title: 'NCB bank' },
        { id: 1, imgUrl: VCB, value: 'VCB', title: 'VCB bank' },
        { id: 2, imgUrl: AGRI, value: 'AGRI', title: 'AGRI bank' },
    ];

    const payMethodsMap = payMethods.map((method: any, index) => {
        return (
            <Grid item xs={1} key={index}>
                <div className={`${classes.container}`} onClick={() => setpaymentStatus(index + 1)}>
                    <img className={`${classes.img}`} src={method.imgUrl} alt="" />
                </div>
            </Grid>
        );
    });

    const payment = (bank: any) => {
        Swal.fire({
            title: 'Xác nhận!',
            text: `Xác nhận thanh toán ngân hàng ${bank.title}?`,
            icon: 'question',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'hủy',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const amount = sessionStorage.getItem('amountPayment');
                const payment = {
                    amount: Number(amount),
                    bankCode: bank.value,
                    description: 'THANH TOAN HOP DONG LAN DAU',
                };

                

                contractService
                    .payByVNPay(payment)
                    .then((resp) => {
                        if (resp.data.success) {
                            const url = resp.data.data.message;
                            window.open(url, "_self");
                        }
                    })
                    .catch((err) => {
                        fireErrorMessage(err);
                    });
            }
        });
    };

    const banksMap = banks.map((bank, index) => {
        return (
            <Grid item xs={1} key={index}>
                <div className={`${classes.container}`} onClick={() => payment(bank)}>
                    <img className={`${classes.img}`} src={bank.imgUrl} alt="" />
                </div>
            </Grid>
        );
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <p className={`${classes.title}`}> Vui lòng chọn phương thức thanh toán: </p>
                <div className="center">
                    <Grid container spacing={2}>
                        {payMethodsMap}
                    </Grid>
                </div>
            </Grid>
            {paymentStatus === 1 && (
                <Grid item xs={12}>
                    <p className={`${classes.title}`}>Chọn ngân hàng:</p>
                    <Grid container spacing={2}>
                        {banksMap}
                    </Grid>
                </Grid>
            )}

            {paymentStatus === 2 && (
                <Grid item xs={12}>
                    CC gì vậy
                </Grid>
            )}
        </Grid>
    );
};

export default RoomContractPayMethod;
