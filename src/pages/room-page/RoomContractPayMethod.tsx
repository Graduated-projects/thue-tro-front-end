import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';

import Vnpay from '@/assets/img/bank-logo/vnpay.png';
import Logo from '@/assets/img/logo.png';

import VCB from '@/assets/img/bank-logo/vcb-logo.jpg';
import NCB from '@/assets/img/bank-logo/ncb-logo.jpg';
import AGRI from '@/assets/img/bank-logo/agribank.jpg';
import acb from '@/assets/img/bank-logo/acb.png';
import bidv from '@/assets/img/bank-logo/bidv.jpg';
import mb from '@/assets/img/bank-logo/mb.png';
import ocb from '@/assets/img/bank-logo/ocb.png';
import ocean from '@/assets/img/bank-logo/ocean.png';
import sacom from '@/assets/img/bank-logo/sacom.jpg';
import scb from '@/assets/img/bank-logo/scb.png';
import sea from '@/assets/img/bank-logo/sea.png';
import shb from '@/assets/img/bank-logo/shb.png';
import techcom from '@/assets/img/bank-logo/techcom.png';
import tp from '@/assets/img/bank-logo/tp.png';
import vib from '@/assets/img/bank-logo/vib.png';
import vietin from '@/assets/img/bank-logo/vietin.png';
import vpbank from '@/assets/img/bank-logo/vpbank.png';

import Swal from 'sweetalert2';
import { contractService } from '@/services/contract.service';
import { fireErrorMessage } from '@/configs/common-function';
import { PAYMENT_STORAGE, typeOfPayment, TYPE_PAYMENT_STORAGE } from '@/configs/const';

interface Props {
    type?: number;
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
const RoomContractPayMethod = ({ type = 0 }: Props) => {
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
        { id: 3, imgUrl: acb, value: 'acb', title: 'acb bank' },
        { id: 4, imgUrl: bidv, value: 'bidv', title: 'bidv bank' },
        { id: 5, imgUrl: ocb, value: 'ocb', title: 'ocb bank' },
        { id: 6, imgUrl: mb, value: 'mb', title: 'mb bank' },
        { id: 7, imgUrl: ocean, value: 'ocean', title: 'ocean bank' },
        { id: 8, imgUrl: sacom, value: 'sacom', title: 'sacom bank' },
        { id: 9, imgUrl: scb, value: 'scb', title: 'scb bank' },
        { id: 10, imgUrl: sea, value: 'sea', title: 'sea bank' },
        { id: 11, imgUrl: shb, value: 'shb', title: 'shb bank' },
        { id: 12, imgUrl: techcom, value: 'techcom', title: 'techcom bank' },
        { id: 13, imgUrl: tp, value: 'tp', title: 'tp bank' },
        { id: 14, imgUrl: vib, value: 'vib', title: 'vib bank' },
        { id: 15, imgUrl: vietin, value: 'vietin', title: 'vietin bank' },
        { id: 16, imgUrl: vpbank, value: 'vpbank', title: 'vpbank bank' },
    ];

    const payMethodsMap = payMethods.map((method: any, index) => {
        if (method.id === 1 && type === typeOfPayment.RECHARGE)
            return <React.Fragment key={index}></React.Fragment>;

        return (
            <Grid item xs={1} key={index}>
                <div className={`${classes.container}`} onClick={() => setpaymentStatus(index + 1)}>
                    <img className={`${classes.img}`} src={method.imgUrl} alt="" />
                </div>
            </Grid>
        );
    });

    const renderDescription = () => {
        switch (type) {
            case typeOfPayment.CREATE_CONTRACT:
                return 'THANH TOAN HOP DONG LAN DAU';
            case typeOfPayment.RECHARGE:
                return 'NAP TIEN VAO VI';
            default:
                return '';
        }
    };

    const renderType = () => {
        switch (type) {
            case typeOfPayment.CREATE_CONTRACT:
                return 'payment';
            case typeOfPayment.RECHARGE:
                return 'recharge';
            default:
                return '';
        }
    };

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
                sessionStorage.setItem(TYPE_PAYMENT_STORAGE, type.toString());
                const amount = sessionStorage.getItem(PAYMENT_STORAGE);
                const payment = {
                    amount: Number(amount),
                    bankCode: bank.value,
                    description: renderDescription(),
                    type: renderType(),
                };

                contractService
                    .payByVNPay(payment)
                    .then((resp) => {

                        if (resp.data.success) {
                            const url = resp.data.data.message;
                            window.open(url, '_self');
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

    const payByHWallet = () => {
        const contractSession = JSON.parse(sessionStorage.getItem('sessionContract') || '');

        const contractInfoClone = {
            roomId: Number(contractSession?.roomId) || '',
            renterId: Number(contractSession?.renterId) || '',
        };

        contractService
            .payByHWallet(contractInfoClone)
            .then((resp) => {
                console.log(resp.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Grid container spacing={2} className="p-3">
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
                    <Button variant="contained" onClick={() => payByHWallet()}>
                        {' '}
                        Thanh toán{' '}
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};

export default RoomContractPayMethod;
