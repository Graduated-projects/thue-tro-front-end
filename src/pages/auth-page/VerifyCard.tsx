import { setFront, setBack } from '@/app/slice/card-upload.slice';
import { useCardStore } from '@/app/store';
import Dropzone from '@/components/dropzone/Dropzone';
import { fireErrorMessage } from '@/configs/common-function';
import { authService } from '@/services/auth.service';
import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '@/configs/path';
import Swal from 'sweetalert2';

interface Body {
    [key: string]: any;
}

interface Props {
    user: Body;
}

const VerifyCard = ({ user }: Props) => {
    const card = useCardStore();
    const [isDisabled, setisDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (card.front.length && card.back.length) setisDisabled(false);
    }, [card]);

    const checkCard = () => {
        setisDisabled(true);
        authService
            .detectCard(card.front[0], card.back[0])
            .then((resp) => {
                setisDisabled(false);
                const frontCardData = resp?.frontCardFile?.data?.data || {};
                const newUser = new FormData();

                newUser.append('email', user.email);
                newUser.append('frontCardFile', card.front[0]);
                newUser.append('backCardFile', card.back[0]);
                newUser.append('password', user.password);
                newUser.append('fullName', user.fullName);
                newUser.append('phoneNumber', user.phoneNumber);
                newUser.append('idCardType', frontCardData.idCardType || "empty data");
                newUser.append('expiredDate', frontCardData.expiredDate || "empty data");
                newUser.append('idCardNo', frontCardData.idCardNo || "empty data");
                newUser.append('issuedDate', frontCardData.issuedDate || "2028-10-23");
                newUser.append('issuedBy', frontCardData.issuedBy || "2028-10-23");
                newUser.append('gender', frontCardData.gender || "empty data");
                newUser.append('dateOfBirth', frontCardData.dateOfBirth || "2028-10-23");
                newUser.append('permanentAddress', frontCardData.permanentAddress || "empty data");
                newUser.append('contactAddress', frontCardData.contactAddress || "empty data");
                newUser.append('nationCode', frontCardData.nationCode || "empty data");
                newUser.append('provinceCode', frontCardData.provinceCode || "empty data");
                newUser.append('districtCode', frontCardData.districtCode || "empty data");
                newUser.append('communeCode', frontCardData.communeCode || "empty data");
                newUser.append('hometown', frontCardData.hometown || "empty data");

                authService
                    .register(newUser)
                    .then((resp) => {
                        console.log(resp.data);
                        
                        if (resp.data.success) {
                            Swal.fire({
                                title: 'Thành công!',
                                text: 'Đăng ký tài khoản thành công!',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Xác nhận',
                            }).then((result) => {
                                navigate(path.main.userInfo);
                            });
                        }
                    })
                    .catch((err) => {
                        fireErrorMessage(err);
                    });
            })
            .catch((err) => {
                setisDisabled(false);
                fireErrorMessage('Có lổi xãy ra. Vui lòng thử lại!');
            });
    };

    return (
        <React.Fragment>
            <Grid item xs={12} textAlign="center" style={{ color: 'red' }}>
                Chúng tôi cần thông tin về CMND/CCCD của bạn để hoàn tất đăng ký. Vui lòng thêm ảnh
                bên dưới.
            </Grid>
            <Grid item xs={12}>
                <Dropzone title="Mặt trước CMND/CCCD" action={setFront} />
                <br></br>
                <Dropzone title="Mặt sau CMND/CCCD" action={setBack} />
            </Grid>
            <Grid item xs={12} className="center">
                <Button variant="contained" onClick={() => checkCard()} disabled={isDisabled}>
                    Tiếp tục
                </Button>
            </Grid>

            <Grid item xs={12} className="center">
                <Button variant="outlined" color="inherit" onClick={() => navigate(-1)}>
                    Quay lại
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default VerifyCard;
