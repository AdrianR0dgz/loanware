import { Router } from 'express'
import * as ctrl from '../controllers/solicitudes.controllers.js'

const router = Router()

router.get('/',          ctrl.getAllSolicitudes)
router.get('/:id',       ctrl.getSolicitudById)
router.post('/',         ctrl.registrarSolicitud)
router.put('/aprobar/:id',  ctrl.aprobarSolicitud)
router.put('/rechazar/:id', ctrl.rechazarSolicitud)
router.put('/devolver/:id', ctrl.marcarDevuelta)

export default router