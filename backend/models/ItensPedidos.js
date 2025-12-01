import db from '../db/db.js'
import { DataTypes } from 'sequelize'

const ItensPedidos = db.define('ItensPedidos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  precoTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
})

export default ItensPedidos