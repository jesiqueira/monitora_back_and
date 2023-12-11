import 'dotenv/config'

import express from 'express'
import cors from 'cors'
// import autenticacao from './app/middlewares/autenticacao'
import routes from './routes'

import './database'

class App {
  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use(cors())
    // this.server.use(autenticacao)
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
