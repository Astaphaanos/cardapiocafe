import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
})

/* async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log('Conexão com o banco estabelecida com sucesso!')
  } catch (err) {
    console.error('Não foi possível conectar ao banco:', err)
  }
}

testConnection()
 */
export default sequelize