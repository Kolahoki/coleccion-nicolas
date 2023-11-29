const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function insertUserData(req, res) {
    const data = req.query
    const result = await db.query(`
        INSERT INTO usuarios (nombre, login, password, rol) VALUES ('${data.nombre}', '${data.login}', '${data.password}', '${data.rol}')
    `);
    return result.affectedRows
}

async function getUserData(req, res) {

    const rows = await db.query(`
        SELECT * FROM usuarios
   `)

    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function deleteUserData(req, res) {
    const data = req.query
    const result = await db.query(`
        DELETE FROM usuarios where id = '${data.id}'
    `)
    return result.affectedRows
}

module.exports = {
    getUserData,
    insertUserData,
    deleteUserData

}
