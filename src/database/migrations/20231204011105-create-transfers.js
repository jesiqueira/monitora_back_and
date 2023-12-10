'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      //criar o tipo ENUM
      await queryInterface.sequelize.query("CREATE TYPE enum_trasnfer_status as ENUM('APROVADO', 'PENDENTE', 'CANCELADA', 'NEGADA');")

      await queryInterface.createTable('transfers', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        data: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        status: {
          type: 'enum_trasnfer_status',
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      })
    } catch (error) {
      // console.error('Erro ao criar a tabela:', error.message)
      throw error
    }
  },

  down(queryInterface) {
    return queryInterface.sequelize.transaction(async (transacao) => {
      try {
        await queryInterface.dropTable('transfers', { transacao })
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_trasnfer_status;', { transacao })
      } catch (error) {
        // Reverte a transação em caso de erro
        await transacao.rollback()
        throw error
      }
    })
  },
}
