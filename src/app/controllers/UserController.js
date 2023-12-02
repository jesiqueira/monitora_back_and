import { Op } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import User from '../models/User'

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
    //localhost:3000?sort=name,email
    //localhost:3000?sort=id:desc,email
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'))
    }

    try {
      const data = await User.findAll({
        attributes: { exclude: ['senha', 'senha_virtual'] },
        where,
        order,
        limit,
        offset: limit * page - limit,
      })
      // console.log({userId: req.userId});
      if (!data) {
        return res.status(404).json({ error: 'Não existe usuários cadastrados!' })
      }
      return res.json(data)
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error.' })
    }
  }
  async show(req, res) {}
  async create(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().required(),
      senha_virtual: Yup.string().required().min(8),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Login e Senha é requerido.' })
    }

    const { id, login, isAdmin, isAtivo, createdAt, updatedAt } = await User.create(req.body)

    return res.status(201).json({ id, login, isAdmin, isAtivo, createdAt, updatedAt })
  }
  async update(req, res) {}
  async destroy(req, res) {}
}

export default new UserController()
