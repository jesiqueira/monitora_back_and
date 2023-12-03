import * as Yup from 'yup'
import Localsite from '../models/Localsite'
import { UniqueConstraintError } from 'sequelize'

class LocalSiteController {
  async index(req, res) {
    return res.json({ hello: 'Olá Local site' })
  }
  async show(req, res) {}
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
