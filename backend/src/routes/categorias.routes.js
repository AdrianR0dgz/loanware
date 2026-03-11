import { Router } from 'express'
import * as ctrl from '../controllers/categorias.controllers.js'

const router = Router()

router.get('/', ctrl.getAllCategorias)

export default router