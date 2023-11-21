import Topbar from "./Topbar";
import { Button } from "@mui/material";
import { useState } from "react";
import InformeColeccion from "./InformeColeccion";

function Informes() {

    const [mostrarInforme, setMostrarInforme] = useState(false);
    const [datosInforme, setDatosInforme] = useState([]);

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
        <Button variant="contained" onClick={handleGetReport}>Informe Colección</Button>
        {mostrarInforme && <InformeColeccion datos={datosInforme} />}
    </>
}
export default Informes;