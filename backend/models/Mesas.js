import db from '../db/db.js'
import { DataTypes } from 'sequelize'

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
    type: DataTypes.ENUM('disponivel', 'ocupada'),
    defaultValue: 'disponivel',
  },
})

export default Mesas