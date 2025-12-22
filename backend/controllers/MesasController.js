import Mesas from '../models/Mesas.js'

class MesasController {

  //* registrando a mesa
  static async registrarMesas(req,res) {
    const {numeroMesa} = req.body

    if(!numeroMesa) {
      return res.status(400).json({message: "Preencha todos os campos!"})
    }

    try {
      // verificando se a mesa que o usuário registrou existe 
      const mesaExiste = await Mesas.findOne({where: {numeroMesa}})
      if(mesaExiste) {
        return res.status(400).json({message: 'Mesa já cadastrada'})
      }

      // criando a mesa nova
      const novaMesa = await Mesas.create({numeroMesa})
      return res.status(201).json(novaMesa)
    } catch (error) {
      return res.status(500).json({error: error.message ,message: 'Erro ao registrar a mesa'})
    }
  }

  //* listando as mesas
  static async listarMesas(req,res) {
    try {
      const mesas = await Mesas.findAll()
      if(!mesas) {
        return res.status(400).json({message: 'Não existe nenhuma mesa registrada'})
      }
      return res.status(200).json(mesas)
    } catch (error) {
       return res.status(500).json({error: error.message ,message: 'Erro na API'})
    }
  }

  //* Pegando cada mesa individualmente
  static async getMesasById(req,res) {
    try {
      const {id} = req.params
      if(!id) {
        return res.status(400).json({message: "id não informado"})
      }

      const mesa = await Mesas.findOne({where: {id}})
      if(!mesa) {
        return res.status(400).json({message: 'Erro ao buscar mesa'})
      }

      return res.status(200).json({mesa})
    } catch (error) {
      return res.status(500).json({error: error.message ,message: 'Erro na API'})
    }
  }

  //* Editando produto: pegando pelo ID
  static async editandoMesa(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ message: 'ID não informado' })
      }

      const mesa = await Mesas.findOne({ where: { id } })
      if (!mesa) {
        return res.status(400).json({ message: 'Mesa não encontrada' })
      }

      return res.status(200).json(mesa)
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }

  //* Editando produto: salvando os dados no db
  static async salvandoEdicaoMesa(req, res) {
    try {
      const { id } = req.params
      const {numeroMesa} = req.body
      if (!id) {
        return res.status(400).json({ message: 'ID não informado' })
      }

      if (!numeroMesa) {
        return res.status(400).json({ message: 'Preencha todos os campos' })
      }

      const mesa = await Mesas.findOne({ where: { id } })

      if (!mesa) {
        return res.status(404).json({ message: 'Mesa não encontrado' })
      }

      await Mesas.update({numeroMesa}, { where: { id } })
      
      const mesaAtualizada = await Mesas.findOne({ where: { id } })

      return res
        .status(201)
        .json({ message: 'Mesa alterado com sucesso!',  mesaAtualizada })
    } catch (error) {
      return res.status(500).json({ error: error.message, message: 'Erro na API' })
    }
  }

  //* deletar a mesa individualmente
  static async deletarMesa(req,res) {
    try {
      const {id} = req.params
      if(!id) {
        return res.status(400).json({message: "ID não informado"})
      }

      const mesa = await Mesas.destroy({where: {id}})
      if(mesa === 0) {
        return res.status(400).json({message: 'Mesa não encontrada'})
      }

      return res.status(200).json({message: "Mesa deletada com sucesso"})
    } catch (error) {
      return res.status(500).json({error: error.message ,message: 'Erro na API'})
    }
  }

}

export default MesasController