import { setFront, setBack } from '@/app/slice/card-upload.slice';
import { useCardStore } from '@/app/store';
import Dropzone from '@/components/dropzone/Dropzone';
import { fireErrorMessage } from '@/configs/common-function';
import { authService } from '@/services/auth.service';
import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Body {
    [key: string]: any;
}

interface Props {
    user: Body;
}

const VerifyCard = ({ user }: Props) => {
    const card = useCardStore();
    const [isDisabled, setisDisabled] = useState(true);

    useEffect(() => {
        if (card.front.length && card.back.length) setisDisabled(false);
    }, [card]);

    const checkCard = () => {
        setisDisabled(true);
        authService
            .detectCard(card.front[0], card.back[0])
            .then((resp) => {
                setisDisabled(false);
                authService.register(user)
            })
            .catch((err) => {
                setisDisabled(false);
                fireErrorMessage("Có lổi xãy ra. Vui lòng thử lại!")

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
                <Button variant="outlined" color="inherit">
                    Quay lại
                </Button>
            </Grid>
        </React.Fragment>
    );
};

export default VerifyCard;
