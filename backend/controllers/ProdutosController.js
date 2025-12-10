import Produtos from '../models/Produtos.js'

class ProdutosController {
  //* Criando produto
  static async registrarProduto(req, res) {
    try {
      const { nome, categoria, preco } = req.body

      if (!nome || !categoria || !preco) {
        return res.status(400).json({ message: 'Preencha todos os campos' })
      }

      const produtos = await Produtos.create({ nome, categoria, preco })
      if (!produtos) {
        return res.status(400).json({ message: 'Erro ao registrar produtos' })
      }

      return res.status(201).json({ message: 'Produto criado com sucesso', produtos })
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }

  //* Listando produtos
  static async listarProdutos(req, res) {
    try {
      const produtos = await Produtos.findAll()
      if (!produtos) {
        return res.status(400).json({ message: 'Erro ao listar produtos' })
      }

      return res.status(200).json(produtos)
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }

  //* Pegando cada produto individualmente
  static async getProdutosById(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: 'ID não informado' })
      }

      const produto = await Produtos.findOne({ where: { id } })
      if (!produto) {
        return res.status(400).json({ message: 'Produto não encontrado' })
      }

      return res.status(200).json(produto)
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }

  //* Editando produto: pegando pelo ID
  static async editandoProduto(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: 'ID não informado' })
      }

      const produto = await Produtos.findOne({ where: { id } })
      if (!produto) {
        return res.status(400).json({ message: 'Produto não encontrado' })
      }

      return res.status(200).json(produto)
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }

  //* Editando produto: salvando os dados no db
  static async salvandoEdicao(req, res) {
    try {
      const { id } = req.params
      const { nome, categoria, preco } = req.body
      if (!id) {
        return res.status(400).json({ message: 'ID não informado' })
      }

      if (!nome || !categoria || !preco) {
        return res.status(400).json({ message: 'Preencha todos os campos' })
      }

      const produto = await Produtos.findOne({ where: { id } })

      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' })
      }

      await Produtos.update({ nome, categoria, preco }, { where: { id } })
      
      const produtoAtualizado = await Produtos.findOne({ where: { id } })

      return res
        .status(201)
        .json({ message: 'Produto alterado com sucesso!', produtoAtualizado })
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }

  //* Deletando produtos
  static async deletarProduto(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: 'ID não informado' })
      }

      await Produtos.destroy({ where: { id } })
      return res.status(200).json({ message: 'Produto excluído com sucesso!' })
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }
}

export default ProdutosController
