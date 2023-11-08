import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { loginActions } from "../store/storelogin";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

function Home() {
  const userData = useSelector((state) => state.login);
  const isLoggedin = userData.isAutenticated;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
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
      </AppBar >
    </>
  );
}

export default Home;
