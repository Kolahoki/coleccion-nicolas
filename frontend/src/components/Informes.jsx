import Topbar from "./Topbar";
import { Button, Grid, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InformeColeccion from "./InformeColeccion";
import InformeUsuarios from "./InformeUsuarios";

function Informes() {

    const [mostrarInforme, setMostrarInforme] = useState(false);
    const [datosInforme, setDatosInforme] = useState([]);
    const [mostrarInformeUsuarios, setMostrarInformeUsuarios] = useState(false);
    const [datosInformeUsuarios, setDatosInformeUsuarios] = useState([]);
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

    const handleGetReportUsers = (e) => {
        fetch(
            `http://localhost:3030/getUsers`
        )
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    const datos = response.data;
                    setDatosInformeUsuarios(datos);
                    setMostrarInformeUsuarios(true);
                }
            })
    }

    return <>
        <Topbar></Topbar>
        <Grid container
            justifyContent='center'
            alignItems='center'
            style={{ minHeight: '90px' }}>
            <Grid item xs={3} md={2} lg={2} style={{ paddingLeft: 50 }}>
                <Tooltip title="Generar informe de los datos" arrow placement="bottom">
                    <Button variant="contained" onClick={handleGetReport}>Informe Colección</Button>
                </Tooltip>
            </Grid>
            <Grid item xs={3} md={2} lg={2} style={{ paddingLeft: 50 }}>
                <Tooltip title="Generar informe de los usuarios" arrow placement="bottom">
                    <Button variant="contained" onClick={handleGetReportUsers}>Informe Usuarios</Button>
                </Tooltip>
            </Grid>
        </Grid>
        {mostrarInforme && <InformeColeccion datos={datosInforme} />}
        {mostrarInformeUsuarios && <InformeUsuarios datos={datosInformeUsuarios} />}
    </>
}
export default Informes;