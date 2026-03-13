import * as solicitudModelo from '../models/solicitudes.models.js'

export const getAllSolicitudes = async (req, res) => {
    try {
        const solicitudes = await solicitudModelo.getAllSolicitudes()
        res.status(200).json(solicitudes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getSolicitudById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' })

        const solicitud = await solicitudModelo.getSolicitudById(id)
        if (!solicitud) return res.status(404).json({ message: 'Solicitud no encontrada' })

        res.status(200).json(solicitud)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getSolicitudesByUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' })

        const [solicitudes, stats] = await Promise.all([
            solicitudModelo.getSolicitudesByUsuario(id),
            solicitudModelo.getStatsByUsuario(id)
        ])

        res.status(200).json({ solicitudes, stats })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const registrarSolicitud = async (req, res) => {
    try {
        const { id_usuario, id_equipo } = req.body
        if (!id_usuario || !id_equipo)
            return res.status(400).json({ message: 'id_usuario e id_equipo son requeridos' })

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
        res.status(200).json({ message: 'Solicitud aprobada' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const rechazarSolicitud = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { id_admin, motivo } = req.body
        if (isNaN(id) || !id_admin)
            return res.status(400).json({ message: 'Datos inválidos' })

        await solicitudModelo.rechazarSolicitud(id, id_admin, motivo || 'Sin motivo especificado')
        res.status(200).json({ message: 'Solicitud rechazada' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const marcarDevuelta = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { id_admin } = req.body
        if (isNaN(id) || !id_admin)
            return res.status(400).json({ message: 'Datos inválidos' })

        await solicitudModelo.marcarDevuelta(id, id_admin)
        res.status(200).json({ message: 'Equipo marcado como devuelto' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}