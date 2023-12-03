import { Op } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import Localsite from '../models/Localsite'
import { UniqueConstraintError } from 'sequelize'

class LocalSiteController {
  async index(req, res) {
    const { nome, cep, estado, cidade, numero, bairro, rua, createdBefore, createdAfter, updatedBefore, updatedAfter, sort } = req.query

    const page = req.query.page || 1
    const limit = req.query.limit || 25

    let where = {}
    let order = []

    if (nome) {
      where = {
        ...where,
        nome: {
          [Op.iLike]: nome,
        },
      }
    }

    if (cep) {
      where = {
        ...where,
        cep: {
          [Op.like]: cep,
        },
      }
    }

    if (estado) {
      where = {
        ...where,
        estado: {
          [Op.iLike]: estado,
        },
      }
    }

    if (cidade) {
      where = {
        ...where,
        cidade: {
          [Op.iLike]: cidade,
        },
      }
    }

    if (numero) {
      where = {
        ...where,
        numero: {
          [Op.eq]: numero,
        },
      }
    }

    if (bairro) {
      where = {
        ...where,
        bairro: {
          [Op.iLike]: bairro,
        },
      }
    }

    if (rua) {
      where = {
        ...where,
        rua: {
          [Op.iLike]: rua,
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
      const data = await Localsite.findAll({
        where,
        order,
        limit,
        offset: limit * page - limit,
      })
      if (!Object.keys(data).length) {
        return res.status(404).json({ error: 'Nada foi localizado!' })
      }
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' })
    }
  }
  async show(req, res) {
    const localsite = await Localsite.findByPk(req.params.id)

    if (localsite === null || !Object.keys(localsite).length) {
      return res.status(404).json({ error: 'Nada foi localizado' })
    }

    return res.status(200).json(localsite)
  }
  async create(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required('nome'),
      cep: Yup.string().required('cep'),
      estado: Yup.string().required('estado'),
      cidade: Yup.string().required('cidade'),
      numero: Yup.number().required('número'),
      bairro: Yup.string().required('bairro'),
      rua: Yup.string().required('rua'),
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (error) {
      // console.log('Errros aconteceram: ', error.errors)
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
      const localSite = await Localsite.create(req.body)
      return res.status(201).json(localSite)
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ error: 'O nome fornecido já existe. Escolha um nome único. ' })
      }
      console.error(error)
      res.status(500).json({ error: 'Erro ao criar LocalSite' })
    }
  }
  async update(req, res) {}
  async destroy(req, res) {}
}

export default new LocalSiteController()
