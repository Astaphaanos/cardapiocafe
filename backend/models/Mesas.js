import db from '../db/db.js'
import { DataTypes } from 'sequelize'
import Pedidos from './Pedidos.js'

const Mesas = db.define('Mesas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  numeroMesa: {
    type: DataTypes.STRING,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM('livre', 'ocupada'),
    defaultValue: 'livre',
  },
})

Mesas.hasMany(Pedidos, {
  foreignKey: 'mesaId'
})

Pedidos.belongsTo(Mesas, {
  foreignKey: 'mesaId'
})


export default Mesas