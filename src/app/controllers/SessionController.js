import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import User from '../models/User'

class SessionController {
  async create(req, res) {
    const usuario = req.body
    const userLogin = usuario.login
    const password = usuario.password

    try {
      const user = await User.findOne({ where: { login: userLogin } })
      // console.log('usuário: ', user.id)
      if (!user) {
        throw new Error('Usuário não Localizado.')
      }
      if (!(await user.verificarSenha(password))) {
        throw new Error('Verificar senha informada.')
      }

      const { id, nome, login, is_admin, is_ativo } = user
      return res.status(200).json({
        user: {
          id,
          nome,
          login,
          is_admin,
          is_ativo,
        },
        token: jwt.sign({ id }, process.env.APP_SECRET, { expiresIn: process.env.EXPIRA_EM }),
      })
    } catch (error) {
      return res.status(401).json({ Error: error.message })
    }
  }

  async validaToken(req, res) {
    try {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(401).json({ valido: false, error: 'Token não fornecido' })
      }

      await promisify(jwt.verify)(token, process.env.APP_SECRET)

      return res.status(200).json({ valido: true, message: 'Token válido' })
    } catch (error) {
      // console.error('Erro ao validar token:', error.message)
      return res.status(401).json({ valido: false, error: 'Token inválido' })
    }
  }
}

export default new SessionController()
