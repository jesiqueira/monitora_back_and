import User from '../models/User'

class SessionController {
  async create(req, res) {
    const usuario = req.body
    const _login = usuario.login
    const password = usuario.password

    try {
      const user = await User.findOne({ where: {login: _login} })
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
      })
    } catch (error) {
      return res.status(401).json({ Error: error.message })
    }
  }
}

export default new SessionController()
