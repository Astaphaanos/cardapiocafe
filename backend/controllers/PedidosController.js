import Pedidos from '../models/Pedidos.js'
import Mesas from '../models/Mesas.js'
import ItensPedidos from '../models/ItensPedidos.js'
import Produtos from '../models/Produtos.js'

class PedidosController {
  //* Criar o pedido (comanda)
  static async criarPedido(req, res) {
    try {
      // retornando os dados pelo body (json)
      const { mesaId, itens } = req.body
      if (!mesaId || !itens) {
        return res.status(400).json({ message: 'Informações inválidas' })
      }

      // verificando se a mesa existe
      const mesa = await Mesas.findByPk(mesaId)
      if (!mesa) return res.status(404).json({ message: 'Mesa não encontrada' })

      // criando o pedido somente com o mesaId, pq o status já tem valor default
      const pedido = await Pedidos.create({ mesaId })

      // percorrendo todos os itens e criando os itens do pedido
      for (const item of itens) {
        const produto = await Produtos.findByPk(item.produtoId)
        if(!produto) return res.status(404).json({ message: `Produto com ID ${item.produtoId} não encontrado` });

        const precoNumero = Number(produto.preco)

        await ItensPedidos.create({
          pedidoId: pedido.id,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          precoTotal: precoNumero * Number(item.quantidade)
        })
      }

      // fazendo o update do status da mesa de 'livre' para 'ocupada'
      await mesa.update({ status: 'ocupada' })

      return res.status(201).json({ message: 'Pedido criado com sucesso', pedido })
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }

  //* Listar todos os pedidos com status aberto
  static async listandoPedidosAberto(req, res) {
    try {
      const pedido = await Pedidos.findAll({ where: { status: 'aberto' } })
      if (!pedido) return res.status(400).json({ message: 'Erro ao retornar os pedidos' })

      return res.status(200).json({ pedido })
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }

  //* Buscar pedido especifico para pagamento (buscar aquele pedido, itens e mesa)
  static async buscarPedido(req, res) {
    try {
      const { id } = req.params
      if (!id) return res.status(400).json({ message: 'ID não informado' })

      const pedido = await Pedidos.findOne({where: { id }, include: [{model: ItensPedidos, include:[{model: Produtos}, {model: Mesas}] } ] })
      if (!pedido) return res.status(400).json({ message: 'Erro ao retornar os pedidos' })

      return res.status(200).json(pedido)
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }

  //* Finalizar o pagamento (atualizar status do pedido para pago e limpar a mesa -> status para 'livre')
  static async finalizarPedido(req,res) {
    try {
      const {id} = req.params
      if(!id) return res.status(400).json({ message: 'ID não informado' })
      
      const pedido = Pedidos.findByPk(id)
      if(!pedido) return res.status(404).json({ message: 'Pedido não encontrado' })
      
      // atualizando o status do pedido para pago
      await pedido.update({status: 'pago'})

      // liberar a mesa
      const mesa = await Mesas.findByPk(pedido.mesaId)
      if(mesa) await mesa.update({status: 'livre'}) // atualizando o status da mesa para livre

      return res.status(200).json({message: 'Pagamento finalizado e mesa liberada'})
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }
}

export default PedidosController
