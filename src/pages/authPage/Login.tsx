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

const useStyles = makeStyles({
    container: {
        height: '85vh',
        flexDirection: 'column',
    },
    customContainer,
    formContainer: {
        width: '20rem',
    },
});

interface Body {
    [key: string]: string;
}

const initialUser: Body = {
    username: '',
    password: '',
};

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAuthStore();

    const onLogin = (user: Body, onFormik: FormikHelpers<Body>) => {
        onFormik.setSubmitting(true);

        dispatch(authAction.login(user))
        .then(unwrapResult)
            .then(() => {
                onFormik.setSubmitting(false);
            })
            .catch((err) => {
                onFormik.setSubmitting(false);
                fireErrorMessage(err)
            });
    };

    useEffect(() => {
        if (auth.isLogin) navigate(path.main.home);
    }, [auth, navigate]);

    return (
        <div className={`center ${classes.container} ${classes.customContainer}`}>
            <Formik initialValues={initialUser} onSubmit={onLogin}>
                {(formik) => (
                    <Form className={classes.formContainer}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    placeholder="Tài khoản"
                                    label="Tài khoản"
                                    spellCheck={false}
                                    className="w-100"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    id="password"
                                    name="password"
                                    autoComplete="off"
                                    placeholder="Mật khẩu"
                                    type="password"
                                    label="Mật khẩu"
                                    className="w-100"
                                    spellCheck={false}
                                />
                            </Grid>
                            <Grid item xs={12} className="center">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                >
                                    Đăng nhập
                                </Button>
                            </Grid>
                            <Grid item xs={12} className="center">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="button"
                                    onClick={() => navigate(path.auth.register)}
                                >
                                    Đăng ký
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
