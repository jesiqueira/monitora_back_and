import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        login: DataTypes.STRING,
        senha: DataTypes.STRING,
        senha_virtual: DataTypes.VIRTUAL,
        isAdmin: DataTypes.BOOLEAN,
        isAtivo: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'User',
        name: {
          singular: 'user',
          plural: 'users',
        },
      }
    )
    this.addHook('beforeSave', async (user) => {
      if (user.senha_virtual) {
        user.senha = await bcrypt.hash(user.senha, 8)
      }
    })
  }

  verificarSenha(senha) {
    return bcrypt.compare(senha, this.senha)
  }

  static associate(models) {
    this.belongsTo(models.Localsite, { foreignKey: 'localsite_id' })
  }
}

export default User
