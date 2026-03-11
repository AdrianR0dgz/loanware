import db from '../config/db.js'

export const getAllCategorias = async () => {
    const [rows] = await db.query('SELECT id_categoria, nombre FROM categorias ORDER BY nombre')
    return rows
}


