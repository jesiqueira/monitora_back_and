import { Model, DataTypes } from 'sequelize';

class Colaborador extends Model {
  static init(sequelize) {
    return super.init(
      {
        login: DataTypes.STRING,
        nome: DataTypes.STRING,
        telefone: DataTypes.STRING,
        rg: DataTypes.STRING,
        cpf: DataTypes.STRING,
        cep: DataTypes.STRING,
        cidade: DataTypes.STRING,
        estado: DataTypes.STRING,
        endereco: DataTypes.STRING,
        bairro: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        relacao: DataTypes.STRING,
        setor: DataTypes.STRING,
        gestor: DataTypes.STRING,
        is_ativo: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'Colaborador',
        name: {
          singular: 'colaborador',
          plural: 'colaboradores',
        },
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Localsite, { foreignKey: 'localsites_id' });
  }
}

export default Colaborador;
