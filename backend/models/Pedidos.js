import { DataTypes } from "sequelize";
import db from '../db/db.js'
import ItensPedidos from "./ItensPedidos.js";

const Pedidos = db.define('Pedidos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  status: {
    type: DataTypes.ENUM('pago', 'aberto'),
    defaultValue: 'aberto',
    allowNull: false
  }
})

Pedidos.hasMany(ItensPedidos, {
  foreignKey: 'pedidoId'
})

ItensPedidos.belongsTo(Pedidos, {
  foreignKey: 'pedidoId'
})

export default Pedidos