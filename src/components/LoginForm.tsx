import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useEffect, useState} from "react";
import {LogOnExt} from "../store/reducers/ActionCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useNavigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";


const defaultTheme = createTheme();
export const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const {user, isLoading} = useAppSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.getItem('userToken') !== null && navigate('/home');
    }, []);

    useEffect(() => {
        if (!isLoading && user?.success) {
            localStorage.setItem('userToken', user.extToken);
            navigate('/home')
        }
    }, [user]);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoginError(false);
        setPasswordError(false);
        if (login === process.env.REACT_APP_USER && password === process.env.REACT_APP_PASSWORD) {
            const data = {
                Username: login,
                Password: password,
            }
            dispatch(LogOnExt(data));
        } else if (login !== process.env.REACT_APP_USER) {
            setLoginError(true);
        } else if (password !== process.env.REACT_APP_PASSWORD) {
            setPasswordError(true);
        }
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            {isLoading && <LinearProgress />}
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h2" variant="h4">
                        Тестовое задание
                    </Typography>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main', marginTop: 8}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Авторизация
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Имя пользователя"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={loginError}
                            helperText={loginError && 'Неверный логин'}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={passwordError}
                            helperText={passwordError && 'Неверный пароль'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Запомнить меня?"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Забыли пароль?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}