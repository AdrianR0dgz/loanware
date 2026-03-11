// solicitud.controller.js

export const registrarSolicitud = async (req, res) => {
    try {
        const { id_usuario, id_equipo } = req.body
        if (!id_usuario || !id_equipo)
            return res.status(400).json({ message: 'id_usuario e id_equipo son requeridos' })

        // La función de BD valida si el equipo está disponible
        // Si no lo está, el SP hace ROLLBACK y no inserta nada
        const activa = await solicitudModelo.tieneSolicitudActiva(id_usuario)
        if (activa)
            return res.status(409).json({ message: 'El usuario ya tiene una solicitud activa' })

        await solicitudModelo.registrarSolicitud(id_usuario, id_equipo)
        res.status(201).json({ message: 'Solicitud registrada correctamente' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const aprobarSolicitud = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { id_admin } = req.body
        if (isNaN(id) || !id_admin)
            return res.status(400).json({ message: 'Datos inválidos' })

        await solicitudModelo.aprobarSolicitud(id, id_admin)
        // El trigger actualiza el equipo y registra auditoría automáticamente
        res.status(200).json({ message: 'Solicitud aprobada' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}