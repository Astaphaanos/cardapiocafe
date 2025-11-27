import ProdutosController from '../controllers/ProdutosController.js'
import {Router} from 'express'

const router = Router()

router.post('/registrar', ProdutosController.registrarProduto)
router.get('/listar', ProdutosController.listarProdutos)
router.get('/:id', ProdutosController.getProdutosById)
router.get('/editar/:id', ProdutosController.editandoProduto)
router.put('/editar', ProdutosController.salvandoEdicao)
router.delete('/deletar/:id', ProdutosController.deletarProduto)

export default router