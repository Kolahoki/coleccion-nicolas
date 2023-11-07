import React from 'react'
import Button from '@mui/material/Button'
import { Box, Container, Grid, TextField, Paper, Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';

function Login() {

    const [login, setLogin] = useState({ user: '', password: '' })

    const isVerifiedUser = () => {
        fetch(`http://localhost:3030/login?user=${login.user}&password=${login.password}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    if (response.data.nombre == undefined) {
                        console.log('Datos incorrectos.')
                    } else {
                        console.log(response)
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
                <Paper elevation={8}>
                    <Box display='flex' flexDirection='column' alignItems='center' p={2}>
                        <Avatar>
                            <LockIcon />
                        </Avatar>
                        <Typography >
                            Acceder
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
                    </Box>
                </Paper>
            </Grid>
        </Grid >
    </>
}
export default Login