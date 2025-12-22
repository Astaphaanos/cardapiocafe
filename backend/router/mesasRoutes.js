import MesasController from '../controllers/MesasController.js'
import {Router} from 'express'

const router = Router()

router.post('/registrar', MesasController.registrarMesas)
router.get('/listar', MesasController.listarMesas)
router.get('/:id', MesasController.getMesasById)
router.get('/editar/:id', MesasController.editandoMesa)
router.put('/editar/:id', MesasController.salvandoEdicaoMesa)
router.delete('/deletar/:id', MesasController.deletarMesa)

export default router