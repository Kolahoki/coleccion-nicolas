import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TableCell, TableRow } from "@mui/material";
import { loginActions } from "../store/storelogin";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useState } from "react";
import { AppBar, Container, Typography, Grid, Toolbar, Paper, Box, TextField, TableContainer, Table, TableHead, TableBody } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function Home() {
  const [item, setItem] = useState({ nombre: '', marca: '', tipo: '', precio: '' })
  const [tableData, setTableData] = useState([])
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
            handleGetItem();
          } else {
            alert('No se pudieron guardar los datos')
          }
        }
      });
  }

  const handleGetItem = (e) => {
    fetch(
      `http://localhost:3030/getItems`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setTableData(response.data)
        }
      })
  }

  const handleDeleteItem = (id) => {
    fetch(
      `http://localhost:3030/deleteItem?id=${id}`
    )
      .then(response => response.json())
      .then(response => {
        if (response) {
          if (response > 0) {
            alert('Datos borrados con éxito')
            handleGetItem();
          } else {
            alert('Error al borrar datos')
          }
        }
      })
  }

  const handleLogout = () => {
    dispatch(loginActions.logout())
    navigate('/')
  }

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/');
    }
    handleGetItem();
  }, [isLoggedin, navigate]);

  console.log(userData);
  return (
    <>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Grid container style={{ height: '70px' }}>
              <Grid item xs={3} md={3} lg={3} style={{ paddingTop: 10 }}>
                <CurrencyBitcoinIcon />
                <Typography>Hola, {userData.userName}</Typography>
              </Grid>
              <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 20 }}>
                <Link to='/home'>Inicio</Link>
              </Grid>
              <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 20 }}>
                <Link to='/'>Informes</Link>
              </Grid>
              <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 20 }}>
                <Link to='/'>Ayuda</Link>
              </Grid>
              <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 15 }}>
                <Button variant="contained" onClick={handleLogout}>Salir</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Paper>
        <Box component='form' autoComplete='off' onSubmit={handleSaveItem} >
          <Box width={'100%'} />
          <br></br>
          <Grid container
            justifyContent='center'
            alignItems='center'
            style={{ minHeight: '150px' }}
          >
            <Grid item xs={3} md={2} lg={2} style={{ paddingLeft: 50 }}>
              <TextField
                label='Nombre'
                required
                value={item.nombre}
                onChange={(event) => setItem({ ...item, nombre: event.target.value })}
              >
              </TextField>
            </Grid>
            <Grid item xs={3} md={2} lg={2} style={{ paddingLeft: 50 }}>
              <TextField
                label='Marca'
                required
                value={item.marca}
                onChange={(event) => setItem({ ...item, marca: event.target.value })}
              >
              </TextField>
            </Grid>
            <Grid item xs={3} md={3} lg={2} style={{ paddingLeft: 50 }}>
              <TextField
                label='Tipo'
                required
                value={item.tipo}
                onChange={(event) => setItem({ ...item, tipo: event.target.value })}
              >
              </TextField>
            </Grid>
            <Grid item xs={3} md={3} lg={2} style={{ paddingLeft: 50 }}>
              <TextField
                label='Precio'
                required
                value={item.precio}
                onChange={(event) => setItem({ ...item, precio: event.target.value })}
              >
              </TextField>
            </Grid>
            <Box width={'100%'}/>
            <Grid item xs={4} md={3} lg={2} style={{ paddingLeft: 50 }}>
              <Button type='submit' variant='contained'>
                Insertar Datos
              </Button>
            </Grid>
            <Box width={'100%'}/>
          </Grid>
        </Box>
      </Paper>
      <TableContainer>
        <Table aria-label='Tabla de registros de la base de datos'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Button onClick={() => handleDeleteItem(row.id)}>
                    <RemoveCircleIcon />
                  </Button>
                </TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Home;
