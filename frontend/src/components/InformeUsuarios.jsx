import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function InformeUsuarios(props) {

    const tableData = props.datos

    console.log(props);
    return <>
        <MaterialTable columns={[
            {
                title: "Nombre",
                field: "nombre",
            },
            {
                title: "Login",
                field: "login",
                filtering: false,
            },
            {
                title: "Password",
                field: "password",
                filtering: false,
            },
            {
                title: "Rol",
                field: "rol",
                filtering: false,
            }
        ]} data={tableData} title="Informe de Usuarios"
            options={{
                exportMenu: [
                    {
                        label: "Exportar a PDF",
                        exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformeUsuariosPDF"),
                    },
                    {
                        label: "Exportar a CSV",
                        exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeUsuariosCSV"),
                    },
                ],
                headerStyle: {
                    backgroundColor: "red",
                    color: "white"
                },
                columnsButton: true,
                filtering: true,
            }}
        />
    </>
}
export default InformeUsuarios;