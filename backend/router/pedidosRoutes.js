import PedidosController from "../controllers/PedidosController.js";
import {Router} from 'express'

const router = Router()

router.post('/criar', PedidosController.criarPedido)
router.get('/listar', PedidosController.listandoPedidosAberto)

export default router