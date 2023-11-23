import Topbar from "./Topbar";
import { Button, Grid, Tooltip   } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InformeColeccion from "./InformeColeccion";

function Informes() {

    const [mostrarInforme, setMostrarInforme] = useState(false);
    const [datosInforme, setDatosInforme] = useState([]);
    const userData = useSelector((state) => state.login);
    const isLoggedin = userData.isAutenticated;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }
    }, [isLoggedin, navigate]);

    const handleGetReport = (e) => {
        fetch(
            `http://localhost:3030/getItems`
        )
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    const datos = response.data;
                    setDatosInforme(datos);
                    setMostrarInforme(true);
                }
            })
    }

    return <>
        <Topbar></Topbar>
        <Grid container
            justifyContent='center'
            alignItems='center'
            style={{ minHeight: '90px' }}>
            <Tooltip title="Generar informe de los datos" arrow placement="bottom">
                <Button variant="contained" onClick={handleGetReport}>Informe Colección</Button>
            </Tooltip>
        </Grid>
        {mostrarInforme && <InformeColeccion datos={datosInforme} />}
    </>
}
export default Informes;