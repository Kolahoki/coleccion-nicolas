import React from 'react'
import Button from '@mui/material/Button'
import { Box, Container, Grid, TextField, Paper, Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { loginActions } from '../store/storelogin';

function Login() {

    const [login, setLogin] = useState({ user: '', password: '' })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isVerifiedUser = () => {
        fetch(`http://localhost:3030/login?user=${login.user}&password=${login.password}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log(response.data.nombre)
                    console.log(response.data.rol)
                    if (response.data.nombre !== undefined) {
                        dispatch(loginActions.login({
                            name: response.data.nombre,
                            rol: response.data.rol
                        }))
                        navigate('/home')
                    } else {
                        console.log('Datos incorrectos.')
                    }
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login.user.length == 0 || login.password.length == 0) {
            console.log('Los campos no pueden estar vacíos.')
        } else {
            console.log(login)
            isVerifiedUser()
        }
    }

    return <>
        <Grid container
            justifyContent='center'
            alignItems='center'
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={2}>
                <Paper elevation={6}>
                    <Avatar>
                        <AccessibleForwardIcon />
                    </Avatar>
                    <Typography >
                        Gaming
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit}>
                        <TextField
                            id='login'
                            label='Usuario'
                            variant='outlined'
                            fullWidth
                            autoFocus
                            value={login.user}
                            onChange={(event) => { setLogin({ ...login, user: event.target.value }) }}
                        >
                        </TextField>
                        <TextField
                            id='loginPassword'
                            type='password'
                            label='Contraseña'
                            variant='outlined'
                            fullWidth
                            value={login.password}
                            onChange={(event) => { setLogin({ ...login, password: event.target.value }) }}
                        >
                        </TextField>
                        <Button type='submit' variant='contained' fullWidth>
                            Acceder
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid >
    </>
}
export default Login