import { Op, UniqueConstraintError, ForeignKeyConstraintError } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import Collaborator from '../models/Collaborator'
import Localsite from '../models/Localsite'

class CollaboratorController {
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

    let where = {} //localsite_id: req.params.siteId
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

    try {
      const totalCount = await Collaborator.count()

      const data = await Collaborator.findAll({
        where,
        attributes: { exclude: ['id', 'localsiteId', 'localsite_id', 'createdAt', 'updatedAt', 'rg', 'cpf', 'bairro', 'cep'] },
        include: [
          {
            model: Localsite,
            attributes: ['id', 'nome', 'cidade'],
            required: true,
          },
        ],
        order,
        limit,
        offset: limit * page - limit,
      })

      // Configuração do cabeçalho com o total de colaboradores
      res.header('Access-Control-Expose-Headers', 'TotalCount')

      const totalColaboradores = data.length === limit ? totalCount : data.length
      if (!Object.keys(data).length) {
        res.set('TotalCount', totalColaboradores)
        return res.status(404).json({ error: 'Não existe Colaborador cadastrados!' })
      }

      res.set('TotalCount', totalColaboradores)
      return res.status(200).json(data)
    } catch (error) {
      // if (error ) {
      //   return res.status(400).json({ Error: 'Erro ao criar Collaborator!' })
      // }
      // console.error(error)
      return res.status(500).json({ Error: error.message })
    }
  }
  async show(req, res) {
    const data = await Collaborator.findOne({
      where: {
        login: req.params.login,
      },
      attributes: { exclude: ['localsiteId', 'localsite_id'] },
      include: [
        {
          model: Localsite,
          attributes: ['id', 'nome', 'cidade'],
        },
      ],
    })

    if (data === null || !Object.keys(data).length) {
      return res.status(404).json({ error: 'Não existe colaborador cadastrado.' })
    }

    return res.status(200).json(data)
  }
  async create(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required('Nome é requerido'),
      login: Yup.string().required('Login é requerido'),
      telefone: Yup.string().required('Telefone é requerido'),
      rg: Yup.string().required('RG é requerido'),
      cpf: Yup.string().required('CPF é requerido'),
      cep: Yup.string().required('CEP é requerido'),
      cidade: Yup.string().required('Cidade é requerido'),
      estado: Yup.string().required('Estado é requerido'),
      endereco: Yup.string().required('Endereco é requerido'),
      bairro: Yup.string().required('Bairro é requerido'),
      numero: Yup.string().required('Número é requerido'),
      relacao: Yup.string().required('Relação é requerido'),
      setor: Yup.string().required('Setor é requerido'),
      gestor: Yup.string().required('Gestor é requerido'),
      is_ativo: Yup.boolean(),
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (error) {
      console.error(error)
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
      const colaborador = await Collaborator.create({
        localsite_id: req.params.siteId,
        ...req.body,
      })
      return res.status(201).json({ colaborador })
    } catch (error) {
      console.error(error)
      if (error instanceof UniqueConstraintError) {
        // console.error(Object.keys(error.fields))
        //Verifica se tem restrição de valor unico e retorna qual o campo está sendo violado ou já cadastrado
        return res.status(400).json({ error: `${Object.keys(error.fields).length > 0 ? Object.keys(error.fields) : null}, já está cadastrado.` })
      }
      if (error instanceof ForeignKeyConstraintError) {
        // console.error('Verifique se Existe Local Site cadastrado!')
        res.status(400).json({ error: 'Verifique se Existe Local Site cadastrado!' })
      } else {
        // console.error(error.message)
        res.status(500).json({ error: 'Erro ao criar Usuário' })
      }
    }
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      login: Yup.string(),
      telefone: Yup.string(),
      rg: Yup.string(),
      cpf: Yup.string(),
      cep: Yup.string(),
      cidade: Yup.string(),
      estado: Yup.string(),
      endereco: Yup.string(),
      bairro: Yup.string(),
      numero: Yup.string(),
      relacao: Yup.string(),
      setor: Yup.string(),
      gestor: Yup.string(),
      is_ativo: Yup.boolean(),
      localsite_id: Yup.number(),
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (error) {
      console.error(error)
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

    const colaborador = await Collaborator.findByPk(req.params.id)

    if (colaborador === null || !Object.keys(colaborador).length) {
      return res.status(404).json({ error: 'Colaborador não localizado.' })
    }
    try {
      const data = await colaborador.update(req.body)
      return res.status(200).json({ data })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erro ao atualizar Colaborador' })
    }
  }
}

export default new CollaboratorController()
