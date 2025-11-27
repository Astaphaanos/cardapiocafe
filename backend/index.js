import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import db from './db/db.js'
import mesasRoutes from './router/mesasRoutes.js'
import produtosRoutes from './router/produtosRoutes.js'

const app = express()


// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api/mesas', mesasRoutes)
app.use('/api/produtos', produtosRoutes)

//Arquivos estáticosa
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, "../frontend/public/pages")))

// Conexão com banco de dados
db.sync().then(() => {
    console.log('Conectado ao Banco de Dados...')
    app.listen(3000)
}).catch((error) => console.log(error))
