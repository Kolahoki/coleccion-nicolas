import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Container, Typography, Grid, Toolbar, Button } from "@mui/material";
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

    return<>
    <AppBar position='static'>
        <Container>
            <Toolbar>
                <Grid container style={{ height: '70px' }}>
                    <Grid item xs={3} md={3} lg={3} style={{ paddingTop: 10 }}>
                        {userData.userRol === 'admin' ? <CurrencyBitcoinIcon /> : <PersonIcon />}
                        <Typography>Hola, {userData.userName}</Typography>
                    </Grid>
                    <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 20 }}>
                        <Link to='/home'>Inicio</Link>
                    </Grid>
                    {userData.userRol === 'admin' && <Grid item xs={2} md={2} lg={2} style={{ paddingTop: 20 }}>
                        <Link to='/informes'>Informes</Link>
                    </Grid>}
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
    </>
}
export default Topbar;