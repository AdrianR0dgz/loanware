import * as equipoModelo from '../models/equipos.models.js'

const ESTADOS_VALIDOS = ['disponible', 'prestado', 'dañado', 'mantenimiento']

// GET ALL
export const getAllEquipos = async (req, res) => {
    try {
        const equipos = await equipoModelo.getAllEquipos()
        res.status(200).json(equipos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET BY ID
export const getEquipoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' })

        const equipo = await equipoModelo.getEquipoById(id)
        if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' })

        res.status(200).json(equipo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET BY ESTADO  →  GET /equipos/estado/:estado
export const getEquiposByEstado = async (req, res) => {
    try {
        const { estado } = req.params
        if (!ESTADOS_VALIDOS.includes(estado))
            return res.status(400).json({ message: `Estado inválido. Use: ${ESTADOS_VALIDOS.join(', ')}` })

        const equipos = await equipoModelo.getEquiposByEstado(estado)
        res.status(200).json(equipos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// CREATE
export const createEquipo = async (req, res) => {
    try {
        const { nombre, id_categoria, estado } = req.body

        if (!nombre)        return res.status(400).json({ message: 'El campo nombre es requerido' })
        if (!id_categoria)  return res.status(400).json({ message: 'El campo id_categoria es requerido' })
        if (estado && !ESTADOS_VALIDOS.includes(estado))
            return res.status(400).json({ message: `Estado inválido. Use: ${ESTADOS_VALIDOS.join(', ')}` })

        const nuevo = await equipoModelo.createEquipo(req.body)
        res.status(201).json(nuevo)
    } catch (error) {
        // Código 1062 = entrada duplicada (codigo_qr es UNIQUE)
        if (error.code === 'ER_DUP_ENTRY')
            return res.status(409).json({ message: 'El código QR ya está registrado' })
        res.status(500).json({ message: error.message })
    }
}

// UPDATE
export const updateEquipo = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' })

        const { nombre, id_categoria, estado } = req.body

        if (!nombre)        return res.status(400).json({ message: 'El campo nombre es requerido' })
        if (!id_categoria)  return res.status(400).json({ message: 'El campo id_categoria es requerido' })
        if (estado && !ESTADOS_VALIDOS.includes(estado))
            return res.status(400).json({ message: `Estado inválido. Use: ${ESTADOS_VALIDOS.join(', ')}` })

        const afectados = await equipoModelo.updateEquipo(id, req.body)
        if (afectados === 0) return res.status(404).json({ message: 'Equipo no encontrado' })

        res.status(200).json({ message: 'Equipo actualizado correctamente' })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY')
            return res.status(409).json({ message: 'El código QR ya está registrado' })
        res.status(500).json({ message: error.message })
    }
}

// DELETE
export const deleteEquipo = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' })

        const afectados = await equipoModelo.deleteEquipo(id)
        if (afectados === 0) return res.status(404).json({ message: 'Equipo no encontrado' })

        res.status(200).json({ message: 'Equipo eliminado correctamente' })
    } catch (error) {
        // Código 1451 = FK constraint (el equipo tiene solicitudes activas)
        if (error.code === 'ER_ROW_IS_REFERENCED_2')
            return res.status(409).json({ message: 'No se puede eliminar, el equipo tiene solicitudes asociadas' })
        res.status(500).json({ message: error.message })
    }
}