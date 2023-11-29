import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import PersonIcon from '@mui/icons-material/Person';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { AppBar, Container, Typography, Grid, Toolbar, Button, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginActions } from "../store/storelogin";

function Topbar() {

    const userData = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(loginActions.logout())
        navigate('/')
    }

    return <>
        <AppBar position='static'>
            <Container>
                <Toolbar>
                    <Grid container style={{ height: '70px' }}>
                        <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 10 }}>
                            {userData.userRol === 'admin' && <CurrencyBitcoinIcon />}
                            {userData.userRol === 'user' && <PersonIcon />}
                            {userData.userRol === 'guest' && <InsertEmoticonIcon />}
                            <Typography>Hola, {userData.userName}</Typography>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 20 }}>
                            <Link to='/home'>Inicio</Link>
                        </Grid>
                        {userData.userRol === 'admin' && <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 20 }}>
                            <Link to='/usuarios'>Usuarios</Link>
                        </Grid>}
                        {userData.userRol === 'admin' && <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 20 }}>
                            <Link to='/informes'>Informes</Link>
                        </Grid>}
                        <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 20 }}>
                            <Link to={'/UserGuidePDF.pdf'} target='_blank'>Ayuda</Link>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 15 }}>
                            <Tooltip title="Salir de la página y cerrar la sesión" arrow placement="bottom">
                                <Button variant="contained" onClick={handleLogout}>Salir</Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    </>
}
export default Topbar;