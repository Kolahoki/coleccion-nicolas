const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function insertData(req, res) {
    const data = req.query
    const result = await db.query(`
        INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES ('${data.nombre}', '${data.marca}', '${data.tipo}', '${data.precio}')
    `);
    return result.affectedRows
}
//Función con la consulta de obtener datos de la base de datos: SELECT * FROM COLECCION
async function getData(req, res) {
    //La variable rows almacena los datos obtenidos de la consulta select.
    const rows = await db.query(`
        SELECT * FROM collecion
   `)
    /*Los datos obtenidos de la consulta del select los paso por la función helper para que
    en el caso de que no haya datos devueltos, me devuelva un array vacío. */
    const data = helper.emptyOrRows(rows)
    return {
        //Devolvemos el resultado del Select, que está almacenado en la variable data
        data
    }
}
//Función con la consulta para borrar datos de la base de datos: DELETE
async function deleteData(req, res) {
    //En data almaceno los datos que me pasan para poder realizar el delete.
    const data = req.query
    const result = await db.query(
        `AQUÍ VA LA CONSULTA`
    )
    /*En la variable result se almacena lo que devueve la consulta. Si accedemos a effectedRow nos da el número de filas de la base de
    datos que ha sido borrado. Si ese número es mayor que cero es que ha habido borrado en la base de datos.*/
    return result.affectedRows
}
//Al final del fichero exporto las funciones getData, insertData y deleteData
module.exports = {
    getData,
    insertData,
    deleteData
}
