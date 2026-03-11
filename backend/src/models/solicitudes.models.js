// solicitud.model.js

// Registrar nueva solicitud (valida disponibilidad internamente)
export const registrarSolicitud = async (id_usuario, id_equipo) => {
    await db.query('CALL RegistrarSolicitud(?, ?)', [id_usuario, id_equipo])
}

// Aprobar
export const aprobarSolicitud = async (id_solicitud, id_admin) => {
    await db.query('CALL AprobarSolicitud(?, ?)', [id_solicitud, id_admin])
}

// Rechazar
export const rechazarSolicitud = async (id_solicitud, id_admin, motivo) => {
    await db.query('CALL RechazarSolicitud(?, ?, ?)', [id_solicitud, id_admin, motivo])
}

// Marcar devuelta
export const marcarDevuelta = async (id_solicitud, id_admin) => {
    await db.query('CALL MarcarDevuelta(?, ?)', [id_solicitud, id_admin])
}

// Verificar si usuario tiene solicitud activa
export const tieneSolicitudActiva = async (id_usuario) => {
    const [[{ resultado }]] = await db.query(
        'SELECT TieneSolicitudActiva(?) AS resultado', [id_usuario]
    )
    return resultado === 1
}

// Consultar todas las solicitudes
export const getAllSolicitudes = async () => {
    const [rows] = await db.query(`
        SELECT s.*, u.nombre, u.usuario, e.nombre AS equipo, e.estado AS estado_equipo
        FROM solicitudes s
        INNER JOIN usuarios u ON s.id_usuario = u.id_usuario
        INNER JOIN equipos e ON s.id_equipo = e.id_equipo
    `)
    return rows
}