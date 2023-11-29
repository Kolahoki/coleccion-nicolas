import Topbar from "./Topbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Paper, Box, TextField, Button, Tooltip, TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function Usuarios() {

    const [usuario, setUsuario] = useState({ nombre: '', login: '', password: '', rol: '' })
    const [tableData, setTableData] = useState([])
    const userData = useSelector((state) => state.login);
    const isLoggedin = userData.isAutenticated;
    const navigate = useNavigate();

    const handleSaveUser = (e) => {
        e.preventDefault();
        fetch(
            `http://localhost:3030/addUser?nombre=${usuario.nombre}&login=${usuario.login}&password=${usuario.password}&rol=${usuario.rol}`
        )
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    if (response > 0) {
                        alert('Datos guardados con éxito')
                        handleGetUser();
                        usuario.nombre = ""
                        usuario.login = ""
                        usuario.password = ""
                        usuario.rol = ""
                    } else {
                        alert('No se pudieron guardar los datos')
                    }
                }
            });
    }

    const handleGetUser = (e) => {
        fetch(
            `http://localhost:3030/getUsers`
        )
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    setTableData(response.data)
                }
            })
    }

    const handleDeleteUser = (id) => {
        fetch(
            `http://localhost:3030/deleteUser?id=${id}`
        )
            .then(response => response.json())
            .then(response => {
                if (response) {
                    if (response > 0) {
                        alert('Usuario borrado con éxito')
                        handleGetUser();
                    } else {
                        alert('Error al borrar usuario')
                    }
                }
            })
    }

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }
        handleGetUser();
    }, [isLoggedin, navigate]);

    console.log(userData);
    return <>
        <Topbar />
        <Paper>
            <Box component='form' autoComplete='off' onSubmit={handleSaveUser}>
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
                            value={usuario.nombre}
                            onChange={(event) => setUsuario({ ...usuario, nombre: event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={3} md={2} lg={2} style={{ paddingLeft: 50 }}>
                        <TextField
                            label='Login'
                            required
                            value={usuario.login}
                            onChange={(event) => setUsuario({ ...usuario, login: event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={3} md={3} lg={2} style={{ paddingLeft: 50 }}>
                        <TextField
                            label='Password'
                            required
                            value={usuario.password}
                            onChange={(event) => setUsuario({ ...usuario, password: event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={3} md={3} lg={2} style={{ paddingLeft: 50 }}>
                        <TextField
                            label='Rol'
                            required
                            value={usuario.rol}
                            onChange={(event) => setUsuario({ ...usuario, rol: event.target.value })}
                        >
                        </TextField>
                    </Grid>
                    <Box width={'100%'} />
                    <Grid item xs={4} md={3} lg={2} style={{ paddingLeft: 50 }}>
                        <Tooltip title="Insertar los datos escritos en los campos de texto" arrow placement="bottom">
                            <Button type='submit' variant='contained'>
                                Insertar Usuario
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Box width={'100%'} />
                </Grid>
            </Box>
        </Paper>
        <TableContainer>
            <Table aria-label='Tabla de usuarios de la base de datos'>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Login</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Rol</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {userData.userRol === 'admin' &&
                                    <Tooltip title="Borrar registro" arrow placement="right">
                                        <Button onClick={() => handleDeleteUser(row.id)}>
                                            <RemoveCircleIcon />
                                        </Button>
                                    </Tooltip>}
                            </TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell>{row.login}</TableCell>
                            <TableCell>{row.password}</TableCell>
                            <TableCell>{row.rol}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default Usuarios;