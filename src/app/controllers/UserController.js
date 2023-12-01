import { Op } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'

class UserController {
  async index(req, res) {
    const { login, isAdmin, isAtivo, createdBefore, createdAfter, updatedBefore, updatedAfter, sort } = req.query

    const page = req.query.page || 1
    const limit = req.query.limit || 25

    let where = {}
    let order = []

    if (login) {
      where = {
        ...where,
        login: {
          [Op.iLike]: login,
        },
      }
    }
    if (isAdmin) {
      where = {
        ...where,
        isAdmin: {
          [Op.iLike]: isAdmin,
        },
      }
    }
    if (isAtivo) {
      where = {
        ...where,
        isAtivo: {
          [Op.iLike]: isAtivo,
        },
      }
    }
    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdBefore), //lê uma String data e transforma em objeto data
        },
      }
    }
    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdAfter), //lê uma String data e transforma em objeto data
        },
      }
    }
    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedBefore), //lê uma String data e transforma em objeto data
        },
      }
    }
    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedAfter), //lê uma String data e transforma em objeto data
        },
      }
    }

    if (sort) {
      order = sort.split(',').map((item) => item.split(':'))
    }
  }
  async show(req, res) {}
  async create(req, res) {}
  async update(req, res) {}
  async destroy(req, res) {}
}

export default new UserController()
