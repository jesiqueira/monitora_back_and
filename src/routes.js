import { Router } from 'express'

const routes = new Router()

routes.get('/hello', (req, res) => {
  return res.json({ messagem: 'Hello, seja bem vindo ao Monitora!' })
})

export default routes
