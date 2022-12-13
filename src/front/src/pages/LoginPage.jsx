import { Banner } from '../components/Banner';
import styles from './LoginPage.module.css';
import { LocusButton } from '../components/LocusButton';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import React, { useState } from 'react';

export default function LoginPage() {
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div className={styles.root}>
            <Banner />
            <div className={styles.loginContainer}>
                <div className={styles.loginInnerContainer}>
                    <h1 className={styles.title}>Login</h1>
                    <form className={styles.loginForm}>
                        <Input
                            className={styles.input}
                            type="email"
                            id="email"
                            placeholder="Email"
                        />
                        <Input
                            className={styles.input}
                            type={values.showPassword ? 'text' : 'password'}
                            onChange={handlePasswordChange('password')}
                            value={values.password}
                            placeholder="Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />

                        <LocusButton
                            children="Login"
                            className={styles.loginFormButton}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
