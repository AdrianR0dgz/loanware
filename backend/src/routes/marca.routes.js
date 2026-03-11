import { Router } from 'express'
import * as ctrl from '../controllers/marca.controllers.js'

const router = Router()

router.get('/',     ctrl.getAllMarcas)
router.get('/:id',  ctrl.getMarcaById)
router.post('/',    ctrl.createMarca)
router.delete('/:id', ctrl.deleteMarca)

export default router