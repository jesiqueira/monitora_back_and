import { Router } from 'express'
import localSites from './app/controllers/LocalSiteController'
import users from './app/controllers/UserController'

const routes = new Router()

// LocalSites
routes.get('/site', localSites.index)
routes.get('/site/:id', localSites.show)
routes.post('/site', localSites.create)
routes.put('/site/:id', localSites.update)
routes.delete('/site/:id', localSites.destroy)

// Users
routes.get('/users', users.index)
routes.get('/users/:id', users.show)
routes.post('/site/:siteId/users', users.create)
routes.put('/users/:id', users.update)

export default routes
