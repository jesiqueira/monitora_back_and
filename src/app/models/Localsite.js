import Sequelize, { Model } from 'sequelize'

class Localsite extends Model {
  static init(sequelize) {
    return super.init(
      {
        nome: Sequelize.STRING,
        cep: Sequelize.STRING,
        estado: Sequelize.STRING,
        cidade: Sequelize.STRING,
        numero: Sequelize.INTEGER,
        cnpj: Sequelize.STRING,
        bairro: Sequelize.STRING,
        rua: Sequelize.STRING,
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
