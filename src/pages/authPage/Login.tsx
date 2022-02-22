import { authService } from '../../services/auth.service';
import { Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik } from 'formik';

import React from 'react';

const useStyles = makeStyles({
    container: {
        height: '65vh',
    },
    formContainer: {
        width: '20rem',
    },
});

interface Body {
     [key: string]: string
}

const initialUser: Body = {
    username: '',
    password: '',
};

const onLogin = (user: Body) => {
     console.log(user);
     
    authService.login(user)
    .then((resp) => {
         console.log(resp);
         
    })
    
};

const Login = () => {
    const classes = useStyles();

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
