import { Router } from 'express'
import localsite from './app/controllers/LocalSiteController'
import users from './app/controllers/UserController'
import colaborador from './app/controllers/CollaboratorController'

const routes = new Router()

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

export default routes
