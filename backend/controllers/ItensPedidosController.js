import ItensPedidos from "../models/ItensPedidos.js";
import Produtos from '../models/Produtos.js'

class ItensPedidosController {
  static async listarItensPorPedido(req,res) {
    try {
      const {pedidoId} = req.params
      if(!pedidoId) {
        return res.status(400).json({message: "Erro ao buscar pedidos"})
      }

      const itens = await ItensPedidos.findAll({where: {pedidoId}, include: [{model: Produtos, attributes: ["nome", 'preco']}]})
      if(!itens) {
        return res.status(400).json({message: "Erro ao retornar o pedido"})
      }

      return res.status(200).json({itens})
    } catch (error) {
      return res.status(500).json({error: error.message, message: "Erro ao buscar itens do pedido"});
    }
  }
}

export default ItensPedidosController