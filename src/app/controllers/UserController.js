import { Op, UniqueConstraintError } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import Localsite from '../models/Localsite'
import User from '../models/User'

class UserController {
  async index(req, res) {
    const { login, is_admin, is_ativo, createdBefore, createdAfter, updatedBefore, updatedAfter, sort } = req.query

    const page = req.query.page || 1
    const limit = req.query.limit || 25

    let where = {} //localsites_id: req.params.siteId
    let order = []

    if (login) {
      where = {
        ...where,
        login: {
          [Op.iLike]: login,
        },
      }
    }
    if (typeof is_admin === 'boolean') {
      where = {
        ...where,
        is_admin: is_admin,
      }
    }
    if (typeof is_ativo === 'boolean') {
      where = {
        ...where,
        is_ativo: is_ativo,
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
        attributes: { exclude: ['senha', 'senha_virtual', 'localsiteId', 'localsites_id'] },
        where,
        include: [
          {
            model: Localsite,
            attributes: ['id', 'nome', 'cidade'],
            // required: true,
          },
        ],
        order,
        limit,
        offset: limit * page - limit,
      })
      if (!Object.keys(data).length) {
        return res.status(404).json({ error: 'Não existe usuários cadastrados!' })
      }
      return res.status(200).json(data)
    } catch (err) {
      console.log('Error: ', err)
      return res.status(500).json({ error: 'Internal server error.' })
    }
  }
  async show(req, res) {
    // const user = await User.findByPk(req.params.id)
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [Localsite],
      attributes: { exclude: ['senha', 'localsiteId', 'localsites_id'] },
    })

    if (user === null || !Object.keys(user).length) {
      return res.status(404).json({ error: 'Nada foi localizado' })
    }

    return res.status(200).json(user)
  }
  async create(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().lowercase().required('Login é requerido.'),
      senha_virtual: Yup.string().required('Senha é requerida').min(8, 'minimo 8 caracteres'),
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (error) {
      console.log('Errros aconteceram: ', error.errors)
      if (Object.entries(error.errors).length === 1) {
        return res.status(422).json({ Error: error.message })
      } else if (Object.entries(error.errors).length >= 2) {
        let campos = []
        error.inner.forEach((element) => {
          campos.push(element.path)
        })
        return res.status(422).json({
          Error: campos.reduce((objeto, campo) => {
            objeto[campo] = campo
            return objeto
          }, {}),
        })
      }
    }

    try {
      //{ id, login, is_admin, is_ativo, createdAt, updatedAt }
      const user = await User.create(
        {
          localsites_id: req.params.siteId,
          ...req.body,
        },
        {
          returning: ['id', 'login', 'is_admin', 'is_ativo', 'created_at', 'updated_at'],
        }
      )
      return res.status(201).json(user)
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ error: 'O login fornecido já existe. Escolha um login diferente.' })
      }
      console.error(error.message)
      res.status(500).json({ error: 'Erro ao criar Usuário' })
    }
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().lowercase(),
      senha_virtual: Yup.string(),
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (error) {
      console.log('Errros aconteceram: ', error)
      if (Object.entries(error.errors).length === 1) {
        return res.status(422).json({ Error: error.message })
      } else if (Object.entries(error.errors).length >= 2) {
        let campos = []
        error.inner.forEach((element) => {
          campos.push(element.path)
        })
        return res.status(422).json({
          Error: campos.reduce((objeto, campo) => {
            objeto[campo] = campo
            return objeto
          }, {}),
        })
      }
    }

    const user = await User.findByPk(req.params.id)

    if (user === null || !Object.keys(user).length) {
      return res.status(404).json({ error: 'Usuário não localizado.' })
    }
    try {
      const { id, login, is_admin, is_ativo } = await user.update(req.body)
      return res.status(200).json({ id, login, is_admin, is_ativo })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erro ao atualizar LocalSite' })
    }
  }
}

export default new UserController()
