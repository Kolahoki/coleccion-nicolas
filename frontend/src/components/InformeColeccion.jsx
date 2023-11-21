import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function InformeColeccion(props) {

    const col = [
        { title: "Nombre", field: "firstName" },
        { title: "Marca", field: "brand" },
        { title: "Tipo", field: "type"},
        { title: "Precio", field: "price", type: "numeric" }
    ];

    console.log(props.datos);
    return <>
    </>
}
export default InformeColeccion;  