import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { loginActions } from "../store/storelogin";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useState } from "react";
import { AppBar, Container, Typography, Link, Grid, Toolbar, Paper, Box, TextField } from "@mui/material";

function Home() {
  const [item, setItem] = useState({ nombre: '', marca: '', tipo: '', precio: '' })
  const userData = useSelector((state) => state.login);
  const isLoggedin = userData.isAutenticated;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveItem = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          if (response > 0) {
            alert('Datos guardados con éxito')
          } else {
            alert('No se pudieron guardar los datos')
          }
        }
      });
  }

  const handleLogout = () => {
    dispatch(loginActions.logout())
    navigate('/')
  }

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/');
    }
  }, [isLoggedin, navigate]);

  console.log(userData);
  return (
    <>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Grid container>
              <Grid item xs={2} md={2} lg={2}>
                <CurrencyBitcoinIcon />
                <Typography>Nicolás</Typography>
              </Grid>
              <Grid item xs={2} md={2} lg={2}>
                <Link to='/home'>Inicio</Link>
              </Grid>
              <Grid item xs={2} md={2} lg={2}>
                <Link to='/'>Informes</Link>
              </Grid>
              <Grid item xs={2} md={2} lg={2}>
                <Link to='/'>Ayuda</Link>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <Button variant="contained" onClick={handleLogout}>Salir</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Paper elevation={5}>
        <Box component='form' autoComplete='off' onSubmit={handleSaveItem} >
          <Grid container
            justifyContent='center'
            alignItems='center'
            style={{ minHeight: '100vh' }}
          >
            <Grid item xs={3} md={3}>
              <TextField
                label='Nombre'
                required
                value={item.nombre}
                onChange={(event) => setItem({ ...item, nombre: event.target.value })}
              >
              </TextField>
            </Grid>
            <Grid item xs={3} md={3}>
              <TextField
                label='Marca'
                required
                value={item.marca}
                onChange={(event) => setItem({ ...item, marca: event.target.value })}
              >
              </TextField>
            </Grid>
            <Grid item xs={3} md={3}>
              <TextField
                label='Tipo'
                required
                value={item.tipo}
                onChange={(event) => setItem({ ...item, tipo: event.target.value })}
              >
              </TextField>
            </Grid>
            <Grid item xs={3} md={3}>
              <TextField
                label='Precio'
                required
                value={item.precio}
                onChange={(event) => setItem({ ...item, precio: event.target.value })}
              >
              </TextField>
            </Grid>
            <Grid item xs={3} md={3}>
              <Button type='submit' variant='contained'>
                Insertar Datos
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default Home;
