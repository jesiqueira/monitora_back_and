import { Model, DataTypes } from 'sequelize'

class Localsite extends Model {
  static init(sequelize) {
    return super.init(
      {
        nome: DataTypes.STRING,
        cep: DataTypes.STRING,
        estado: DataTypes.STRING,
        cidade: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        cnpj: DataTypes.STRING,
        bairro: DataTypes.STRING,
        rua: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Localsite',
        name: {
          singular: 'localsite',
          plural: 'localsites',
        },
      }
    )
  }
  static associate(models) {
    this.hasMany(models.User)
  }
}

export default Localsite
