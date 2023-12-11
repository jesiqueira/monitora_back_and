import { Router } from 'express'
import localsite from './app/controllers/LocalSiteController'
import users from './app/controllers/UserController'
import colaborador from './app/controllers/CollaboratorController'
import session from './app/controllers/SessionController'
import autenticacao from './app/middlewares/autenticacao'

const routes = new Router()

// Sessions
routes.post('/session', session.create)

// Controla o acesso a partir desse ponto
routes.use(autenticacao)

// localsite
routes.get('/site', localsite.index)
routes.get('/site/:id', localsite.show)
routes.post('/site', localsite.create)
routes.put('/site/:id', localsite.update)
routes.delete('/site/:id', localsite.destroy)

// Users
routes.get('/users', users.index)
routes.get('/users/:id', users.show)
routes.post('/site/:siteId/users', users.create)
routes.put('/users/:id', users.update)

//collaborators
routes.get('/colaborador', colaborador.index)
routes.get('/colaborador/:id', colaborador.show)
routes.post('/colaborador/:siteId/colaborador', colaborador.create)
routes.put('/colaborador/:id', colaborador.update)

export default routes
