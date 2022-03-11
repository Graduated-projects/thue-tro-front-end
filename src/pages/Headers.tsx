import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { path } from '../configs/path';
import { useAuthStore } from '@/app/store';
import { authAction } from '@/app/action/auth.action';
import { useAppDispatch } from '@/app/hooks';

export default function Headers() {
    const auth = useAuthStore();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setAnchorEl(null);
        dispatch(authAction.logout())
        .then(() => navigate(path.main.home))
    };
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate('/')}
                    >
                        <img src={logo} alt="" className="logo" />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Tìm hiểu thêm
                    </Typography>
                    {auth.isLogin ? (
                        <div>
                            <IconButton size="large" onClick={handleMenu} color="inherit">
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={() => {
                                        navigate(path.main.userInfo);
                                        setAnchorEl(null);
                                    }}
                                >
                                    Thông tin
                                </MenuItem>
                                <MenuItem onClick={() => logout()}>Đăng xuất</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div>
                            <IconButton
                                size="large"
                                onClick={() => navigate(path.auth.login)}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>{' '}
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
