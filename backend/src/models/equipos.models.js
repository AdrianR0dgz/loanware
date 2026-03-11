import db from '../config/db.js'

// GET ALL - con nombre de categoría
export const getAllEquipos = async () => {
    const [rows] = await db.query(`
        SELECT e.id_equipo, e.nombre, e.descripcion, e.ruta_imagen,
            e.codigo_qr, e.estado, e.fecha_registro,
            c.nombre AS categoria
        FROM equipos e
        INNER JOIN categorias c ON e.id_categoria = c.id_categoria
    `)
    return rows
}

// GET BY ID
export const getEquipoById = async (id) => {
    const [rows] = await db.query(`
        SELECT e.id_equipo, e.nombre, e.descripcion, e.ruta_imagen,
            e.codigo_qr, e.estado, e.fecha_registro,
            e.id_categoria, c.nombre AS categoria
        FROM equipos e
        INNER JOIN categorias c ON e.id_categoria = c.id_categoria
        WHERE e.id_equipo = ?
    `, [id])
    return rows[0]
}

// GET BY ESTADO - filtrar por disponible / prestado / dañado / mantenimiento
export const getEquiposByEstado = async (estado) => {
    const [rows] = await db.query(`
        SELECT e.id_equipo, e.nombre, e.descripcion, e.ruta_imagen,
            e.codigo_qr, e.estado, e.fecha_registro,
            c.nombre AS categoria
        FROM equipos e
        INNER JOIN categorias c ON e.id_categoria = c.id_categoria
        WHERE e.estado = ?
    `, [estado])
    return rows
}

// CREATE
export const createEquipo = async ({ nombre, descripcion, ruta_imagen, codigo_qr, id_categoria, estado }) => {
    const [result] = await db.query(
        `INSERT INTO equipos (nombre, descripcion, ruta_imagen, codigo_qr, id_categoria, estado)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            nombre,
            descripcion  || null,
            ruta_imagen  || null,
            codigo_qr    || null,
            id_categoria,
            estado       || 'disponible'
        ]
    )
    return { id: result.insertId, nombre, descripcion, ruta_imagen, codigo_qr, id_categoria, estado: estado || 'disponible' }
}

// UPDATE
export const updateEquipo = async (id, { nombre, descripcion, ruta_imagen, codigo_qr, id_categoria, estado }) => {
    const [result] = await db.query(
        `UPDATE equipos
        SET nombre = ?, descripcion = ?, ruta_imagen = ?, codigo_qr = ?, id_categoria = ?, estado = ?
        WHERE id_equipo = ?`,
        [nombre, descripcion || null, ruta_imagen || null, codigo_qr || null, id_categoria, estado, id]
    )
    return result.affectedRows
}

// DELETE
export const deleteEquipo = async (id) => {
    const [result] = await db.query(
        'DELETE FROM equipos WHERE id_equipo = ?',
        [id]
    )
    return result.affectedRows
}