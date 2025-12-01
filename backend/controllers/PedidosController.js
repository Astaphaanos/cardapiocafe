import Pedidos from '../models/Pedidos.js'
import Mesas from '../models/Mesas.js'
import ItensPedidos from '../models/ItensPedidos.js'

class PedidosController {

  //* Criar o pedido (comanda)
  static async criarPedido(req,res) {
    try {
      // retornando os dados pelo body (json)
      const {mesaId, itens} = req.body
      if(!mesaId || !itens) {
        return res.status(400).json({message: "Informações inválidas"})
      }

      // Pegando a mesa pela pk
      const mesa = await Mesas.findByPk(mesaId)
      if(!mesa) return res.status(404).json({ message: "Mesa não encontrada" });

      // criando o pedido somente com o mesaId, pq o status já tem valor default
      const pedido = await Pedidos.create({mesaId})

      // percorrendo todos os itens e criando os valores dentro dele
      for(const item of itens) {
        await ItensPedidos.create({
          pedidoId: pedido.id,
          produtoId: produto.id,
          quantidade: item.quantidade
        })
      }

      // fazendo o update do status da mesa de 'livre' para 'ocupada'
      await mesa.update({status: 'ocupada'})

      return res.status(201).json({ message: "Pedido criado com sucesso", pedido});

    } catch (error) {
      return res.status(500).json({ error: error.message, message: "Erro na API" });
    }
  }

  //* Listar todos os pedidos com status aberto 
  static async listandoPedidosAberto(req,res) {
    try {
      const pedido = await Pedidos.findAll({where: {status: 'aberto'}})
      if(!pedido) return res.status(400).json({message: "Erro ao retornar os pedidos"})

      return res.status(200).json({pedido})

    } catch (error) {
      return res.status(500).json({ error: error.message, message: "Erro na API" });
    }
  }

  //* Buscar pedido especifico para pagamento (buscar aquele pedido, itens e mesa)

  //* Finalizar o pagamento (atualizar status do pedido para pago e limpar a mesa -> status para 'livre')

}

export default PedidosController