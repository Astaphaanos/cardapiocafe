import MesasController from '../controllers/MesasController.js'
import {Router} from 'express'

const router = Router()

router.post('/registrar', MesasController.registrarMesas)
router.get('/listar', MesasController.listarMesas)
router.get('/:id', MesasController.getMesasById)
router.delete('/delete/:id', MesasController.deletarMesa)

export default router