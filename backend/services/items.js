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

async function getData(req, res) {

    const rows = await db.query(`
        SELECT * FROM collecion
   `)

    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function deleteData(req, res) {
    const data = req.query
    const result = await db.query(`
        DELETE FROM coleccion where id = '${data.id}'
    `)
    return result.affectedRows
}

module.exports = {
    getData,
    insertData,
    deleteData
}
