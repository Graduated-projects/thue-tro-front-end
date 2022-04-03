import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '@/configs/path';
import { customContainer } from '@/configs/styles';
import { useAuthStore } from '@/app/store';
import { authAction } from '@/app/action/auth.action';
import { useAppDispatch } from '@/app/hooks';
import { authService } from '@/services/auth.service';
import { Step1Schema } from '@/validation-yup/register.validation';
import { fireErrorMessage } from '@/configs/common-function';
import Swal from 'sweetalert2';
import VerifyCard from './VerifyCard';

const useStyles = makeStyles({
    container: {
        height: '85vh',
        flexDirection: 'column',
    },
    customContainer,
    formContainer: {
        width: '30rem',
        border: '1px dashed #DDDDDD',
        boxShadow: '0 0 5px #DDDDDD',
        padding: '5rem',
        borderRadius: '7.5px',
    },
});

interface Body {
    [key: string]: any;
}

const initialUser: Body = {
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    confirmPassword: '',
    otp: '',
};

const Register = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAuthStore();
    const registerSteps = {
        FIRST: 0,
        SECONDS: 1,
        THIRD: 2,
        FOURTH: 3,
    };
    const [currentRegisterStep, setcurrentRegisterStep] = useState(0);
    const onRegisterStep1 = (user: Body, onFormik: FormikProps<Body>) => {
        const ACCEPTED_NUMBER_ERROR_PASS_STEP_1 = 2;

        if (Object.keys(onFormik.errors).length <= ACCEPTED_NUMBER_ERROR_PASS_STEP_1) {
            authService
                .isExistsEmail(user.email as string)
                .then((resp) => {
                    const result = resp.data;
                    const isExists = result.data.exists;

                    if (isExists) fireErrorMessage('Email đã tồn tại!');
                    else {
                        authService.sendOtp(user.email);
                        setcurrentRegisterStep(registerSteps.SECONDS);
                    }
                })
                .catch((err) => {
                    fireErrorMessage(err);
                });
        }
    };

    // dispatch(authAction.login({ username: user.email, password: user.password })).then(
    //     () => {
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Đăng ký thành công!',
    //             confirmButtonText: 'Về trang chủ',
    //         }).then(() => {
    //             navigate(path.main.home);
    //         });
    //     }
    // );
    const onRegisterStep3 = (user: Body, onFormik: FormikProps<Body>) => {
        if (user.password && user.password === user.confirmPassword) {
            setcurrentRegisterStep(registerSteps.FOURTH);
        } else {
            fireErrorMessage('Xác nhận mật khẩu không trùng');
        }
    };

    const onRegisterStep2 = (user: Body, onFormik: FormikProps<Body>) => {
        onFormik.setSubmitting(true);
        const userRegister = {
            email: user.email,
            otp: user.otp,
        };

        authService
            .verifyEmail(userRegister)
            .then((resp) => {
                onFormik.setSubmitting(false);
                const result = resp.data;

                if (result.data.success) setcurrentRegisterStep(registerSteps.THIRD);
            })
            .catch((err) => {
                onFormik.setSubmitting(false);
                fireErrorMessage(err);
            });
    };

    useEffect(() => {
        if (auth.isLogin) navigate(path.main.home);
    }, [auth, navigate]);

    return (
        <div className={`center ${classes.container} ${classes.customContainer}`}>
            <Formik initialValues={initialUser} onSubmit={() => {}} validationSchema={Step1Schema}>
                {(formik) => (
                    <Form className={classes.formContainer}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} textAlign="center">
                                Đăng ký
                            </Grid>
                            {currentRegisterStep === registerSteps.FIRST && (
                                <React.Fragment>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            autoComplete="off"
                                            placeholder="Họ & Tên"
                                            label="Họ & Tên"
                                            spellCheck={false}
                                            className="w-100"
                                        />
                                        <ErrorMessage
                                            name="fullName"
                                            render={(err) => (
                                                <div style={{ color: 'red' }}>{err}</div>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="off"
                                            placeholder="Email"
                                            label="Email"
                                            spellCheck={false}
                                            className="w-100"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            render={(err) => (
                                                <div style={{ color: 'red' }}>{err}</div>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            type="text"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            autoComplete="off"
                                            placeholder="Số điện thoại"
                                            label="Số điện thoại"
                                            spellCheck={false}
                                            className="w-100"
                                        />
                                        <ErrorMessage
                                            name="phoneNumber"
                                            render={(err) => (
                                                <div style={{ color: 'red' }}>{err}</div>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="center">
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            onClick={() => onRegisterStep1(formik.values, formik)}
                                        >
                                            Tiếp tục
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} className="center">
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            onClick={() => navigate(path.auth.login)}
                                        >
                                            Quay lại
                                        </Button>
                                    </Grid>
                                </React.Fragment>
                            )}
                            {/* step 2 */}

                            {currentRegisterStep === registerSteps.THIRD && (
                                <React.Fragment>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="off"
                                            placeholder="Mật khẩu"
                                            label="Mật khẩu"
                                            spellCheck={false}
                                            className="w-100"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            render={(err) => (
                                                <div style={{ color: 'red' }}>{err}</div>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            autoComplete="off"
                                            placeholder="Xác nhận Mật khẩu"
                                            label="Xác nhận Mật khẩu"
                                            spellCheck={false}
                                            className="w-100"
                                        />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            render={(err) => (
                                                <div style={{ color: 'red' }}>{err}</div>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="center">
                                        <Button
                                            variant="contained"
                                            onClick={() => onRegisterStep3(formik.values, formik)}
                                            disabled={!formik.isValid}
                                        >
                                            Đăng ký
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} className="center">
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            onClick={() =>
                                                setcurrentRegisterStep(registerSteps.FIRST)
                                            }
                                        >
                                            Quay lại
                                        </Button>
                                    </Grid>
                                </React.Fragment>
                            )}

                            {currentRegisterStep === registerSteps.SECONDS && (
                                <React.Fragment>
                                    <Grid item xs={12} textAlign="center">
                                        Chúng tôi đã gửi về email: <b>{formik.values.email}</b> một
                                        mã OTP. Vui lòng nhập mã OTP để hoàn tất đăng ký!
                                    </Grid>
                                    <Grid item xs={12} className="center">
                                        <Grid item xs={12} className="center">
                                            <Field
                                                as={TextField}
                                                type="text"
                                                name="otp"
                                                id="otp"
                                                autoComplete="off"
                                                placeholder="Mã OTP"
                                                label="Mã OTP"
                                                spellCheck={false}
                                                className="w-100"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} className="center">
                                        <Button
                                            variant="contained"
                                            onClick={() => onRegisterStep2(formik.values, formik)}
                                            disabled={formik.isSubmitting}
                                        >
                                            Xác thực OTP
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} className="center">
                                        <Button variant="contained" color="success">
                                            Gữi lại OTP
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} className="center">
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            onClick={() =>
                                                setcurrentRegisterStep(registerSteps.FIRST)
                                            }
                                        >
                                            Quay lại
                                        </Button>
                                    </Grid>
                                </React.Fragment>
                            )}

                            {currentRegisterStep === registerSteps.FOURTH && <VerifyCard user={initialUser} />}
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
