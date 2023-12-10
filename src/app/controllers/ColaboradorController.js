import { Op } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import Colaborador from '../models/Colaborador'
import Localsite from '../models/Localsite'

class ColaboradorController {
  async index(req, res) {
    const {
      login,
      nome,
      telefone,
      rg,
      cpf,
      cep,
      cidade,
      estado,
      endereco,
      bairro,
      numero,
      relacao,
      setor,
      gestor,
      is_ativo,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query

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
    if (nome) {
      where = {
        ...where,
        nome: {
          [Op.iLike]: nome,
        },
      }
    }
    if (telefone) {
      where = {
        ...where,
        telefone: {
          [Op.iLike]: telefone,
        },
      }
    }
    if (rg) {
      where = {
        ...where,
        rg: {
          [Op.iLike]: rg,
        },
      }
    }
    if (cpf) {
      where = {
        ...where,
        cpf: {
          [Op.iLike]: cpf,
        },
      }
    }
    if (cep) {
      where = {
        ...where,
        cep: {
          [Op.iLike]: cep,
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
    if (estado) {
      where = {
        ...where,
        estado: {
          [Op.iLike]: estado,
        },
      }
    }
    if (endereco) {
      where = {
        ...where,
        endereco: {
          [Op.iLike]: endereco,
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
    if (numero) {
      where = {
        ...where,
        numero: {
          [Op.iLike]: numero,
        },
      }
    }
    if (relacao) {
      where = {
        ...where,
        relacao: {
          [Op.iLike]: relacao,
        },
      }
    }
    if (setor) {
      where = {
        ...where,
        setor: {
          [Op.iLike]: setor,
        },
      }
    }
    if (gestor) {
      where = {
        ...where,
        gestor: {
          [Op.iLike]: gestor,
        },
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

    if (sort) {
      order = sort.split(',').map((item) => item.split(':'))
    }

    // include: [
    //   {
    //     model: Localsite,
    //     attributes: ['id', 'nome', 'cidade'],
    //     // required: true,
    //   },
    // ],
    try {
      const data = await Colaborador.findAll({
        where,
        order,
        limit,
        offset: limit * page - limit,
      })
      console.log('Colaboradores: ', data)
      if (!Object.keys(data).length) {
        return res.status(404).json({ error: 'Não existe colaboradores cadastrados!' })
      }
      return res.status(200).json(data)
    } catch (error) {
      // if (error ) {
      //   return res.status(400).json({ Error: 'Erro ao criar colaborador!' })
      // }
      console.error(error)
      return res.status(500).json({ Error: error.message })
    }
  }
  async show(req, res) {}
  async create(req, res) {}
  async update(req, res) {}
}

export default new ColaboradorController()
