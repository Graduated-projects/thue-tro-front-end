import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '@/configs/path';
import { customContainer } from '@/configs/styles';
import { useAuthStore } from '@/app/store';
import { authAction } from '@/app/action/auth.action';
import { useAppDispatch } from '@/app/hooks';
import { fireErrorMessage } from '@/configs/common-function';
import { unwrapResult } from '@reduxjs/toolkit';
import { authService } from '@/services/auth.service';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    container: {
        height: '85vh',
        flexDirection: 'column',
    },
    customContainer,
    formContainer: {
        width: '20rem',
    },
    buttonSize: {
        width: '10rem',
    },
});

interface Body {
    [key: string]: string;
}

const initialUser: Body = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

const ChangePassword = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLogin } = useAuthStore();

    const onChangePassword = (user: Body, onFormik: FormikHelpers<Body>) => {
        onFormik.setSubmitting(true);

        console.log(
            user.newPassword,
            user.confirmNewPassword,
            user.newPassword !== user.confirmNewPassword
        );

        if (user.newPassword !== user.confirmNewPassword) {
            onFormik.setSubmitting(false);
            fireErrorMessage('Xác nhận mật khẩu không khớp!');
        } else {
            onFormik.setSubmitting(false);
            const newUser = {
                oldPassword: user.oldPassword,
                newPassword: user.newPassword,
            };

            authService
                .changePassword(newUser)
                .then((resp) => {
                    if (resp.data.success)
                        Swal.fire({
                            title: 'Thành công!',
                            text: 'Đổi mật khẩu thành công!',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Xác nhận',
                        }).then((result) => {
                         //    navigate(path.main.userInfo);
                        });
                        else fireErrorMessage(resp.data.message)
                })
                .catch((err) => {
                    fireErrorMessage(err);
                });
        }
    };

    //     useEffect(() => {
    //         if (!isLogin) navigate(path.main.home);
    //     }, [isLogin, navigate]);

    return (
        <div className={`center ${classes.container} ${classes.customContainer}`}>
            <Formik initialValues={initialUser} onSubmit={onChangePassword}>
                {(formik) => (
                    <Form className={classes.formContainer}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    type="password"
                                    name="oldPassword"
                                    id="oldPassword"
                                    autoComplete="off"
                                    placeholder="Mật khẩu cũ"
                                    label="Mật khẩu cũ"
                                    spellCheck={false}
                                    className="w-100"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    id="newPassword"
                                    name="newPassword"
                                    autoComplete="off"
                                    placeholder="Mật khẩu mới"
                                    type="password"
                                    label="Mật khẩu mới"
                                    className="w-100"
                                    spellCheck={false}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    autoComplete="off"
                                    placeholder="Xác nhận mật khẩu"
                                    type="password"
                                    label="Xác nhận mật khẩu"
                                    className="w-100"
                                    spellCheck={false}
                                />
                            </Grid>
                            <Grid item xs={12} className="center">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className={classes.buttonSize}
                                >
                                    Đổi mật khẩu
                                </Button>
                            </Grid>
                            <Grid item xs={12} className="center">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.buttonSize}
                                    type="button"
                                    onClick={() => navigate(-1)}
                                >
                                    Quay lại
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ChangePassword;
