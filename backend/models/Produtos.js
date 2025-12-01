import { DataTypes } from "sequelize";
import db from '../db/db.js'
import ItensPedidos from "./ItensPedidos.js";

const Produtos = db.define('Produtos' ,{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  categoria: {
    type: DataTypes.ENUM('Cafés', 'Salgados', 'Doces'),
    allowNull: false
  },

  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
})

Produtos.hasMany(ItensPedidos, {
  foreignKey: 'produtoId'
})

ItensPedidos.belongsTo(Produtos, {
  foreignKey: 'produtoId'
})

export default Produtos