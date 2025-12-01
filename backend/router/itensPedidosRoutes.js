import ItensPedidosController from '../controllers/ItensPedidosController.js'
import {Router} from 'express'

const router = Router()

router.get('/listar/:pedidoId', ItensPedidosController.listarItensPorPedido)

export default router