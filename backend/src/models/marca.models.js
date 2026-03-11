import db from '../config/db.js'

export const getAllMarcas = async () => {
    const [rows] = await db.query(`SELECT * FROM marcas`)
    return rows
}

export const getMarcaById = async (id) => {
    const [rows] = await db.query('SELECT * FROM marca WHERE id_marca = ?', [id])
    return rows[0]
}

export const createMarca = async ({ nombre }) => {
    const [result] = await db.query(`INSERT INTO marcas (nombre) VALUES (?)`, [nombre])
    return { id: result.insertId, nombre }
}

export const deleteMarca = async (id) => {
    const [result] = await db.query(`DELETE FROM marcas WHERE id_marca = ?`, [id]
    )
    return result.affectedRows
}