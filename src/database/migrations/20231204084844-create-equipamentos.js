'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //criar o tipo ENUM
    await queryInterface.sequelize.query("CREATE TYPE enum_equipamentos_categorias as ENUM('DESKTOP','NOTEBOOK','MONITOR');")

    await queryInterface.createTable('equipamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      posicao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoria: {
        type: 'enum_equipamentos_categorias',
        defaultValue: 'DESKTOP',
        allowNull: false,
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fabricante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      patrimônio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serial: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_final_garantia: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      data_nf: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      localsite_id: {
        type: Sequelize.INTEGER,
        references: { model: 'localsites', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
    })
  },

  down(queryInterface) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      // Utiliza uma transação para garantir consistência
      const transacao = await queryInterface.sequelize.transaction()

      try {
        // Remove a tabela
        await queryInterface.dropTable('equipamentos', { transacao })

        // Remove o tipo ENUM
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_equipamentos_categorias;', { transacao })

        // Confirma a transação
        await transacao.commit()
      } catch (error) {
        // Reverte a transação em caso de erro
        await transacao.rollback()
        throw error
      }
    })
  },
}
