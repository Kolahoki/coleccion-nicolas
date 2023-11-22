import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function InformeColeccion(props) {

    /*const col = [
        { title: "Nombre", field: "nombre" },
        { title: "Marca", field: "marca" },
        { title: "Tipo", field: "tipo" },
        { title: "Precio", field: "precio" }
    ];*/

    const tableData = props.datos

    console.log(props);
    return <>
        <MaterialTable columns={[
            {
                title: "Nombre",
                field: "nombre",
                filtering: false,
            },
            {
                title: "Marca",
                field: "marca",
            },
            {
                title: "Tipo",
                field: "tipo",
            },
            {
                title: "Precio",
                field: "precio",
                type: "numeric",
                filtering: false,
                align: "center",    
            }
        ]} data={tableData} title="Informe"
            options={{
                exportMenu: [
                    {
                        label: "Exportar a PDF",
                        exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformePDF"),
                    },
                    {
                        label: "Exportar a CSV",
                        exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeCSV"),
                    },
                ],
                headerStyle: {
                    backgroundColor: "red",
                    color: "white"
                },
                columnsButton: true,
                filtering: true,
            }}
            renderSummaryRow={({ column, data  }) =>
            column.field === "precio"
                    && {
                        value: data.reduce((agg, row) => agg + row.precio, 0),
                        style: { background: "crimson", color: "white", fontSize: "20px", textAlign: "center" },
                    }
            }
        />
    </>
}
export default InformeColeccion;  