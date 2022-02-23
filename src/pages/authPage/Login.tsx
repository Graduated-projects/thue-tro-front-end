import { authService } from '../../services/auth.service';
import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '../../configs/path';
import { setAuthSlice } from '../../app/slice/auth.slice';
import { useAuthStore } from '../../app/store';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    container: {
        height: '65vh',
        flexDirection: 'column',
    },
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
    const auth = useAuthStore();
    const dispatch = useDispatch();
    console.log(auth);

    const onLogin = (user: Body) => {
        authService.login(user).then((resp) => {
            localStorage.setItem('accessToken', resp.data);
            //   navigate(path.main.home)
            dispatch(setAuthSlice(resp.data));
        });
    };

    // useEffect(() => {
    //   first

    //   return () => {
    //     second
    //   }
    // }, [third])

    return (
        <div className={`center ${classes.container}`}>
            <Formik initialValues={initialUser} onSubmit={onLogin}>
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
                            <Button variant="contained" type="submit">
                                Đăng nhập
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
