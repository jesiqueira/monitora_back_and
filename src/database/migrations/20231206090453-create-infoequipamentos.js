'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("CREATE TYPE enum_info_equipamentos_status as ENUM('ESTOQUE', 'EM USO')")

    await queryInterface.createTable('infoequipamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      so: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: 'enum_info_equipamentos_status',
        allowNull: false,
        defaultValue: 'ESTOQUE',
      },
      localidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      local_atual: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gestor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      relacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nome_usuario: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hostname: {
        type: Sequelize.STRING,
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
      equipamentos_id: {
        type: Sequelize.INTEGER,
        references: { model: 'equipamentos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      colaboradores_id: {
        type: Sequelize.INTEGER,
        references: { model: 'colaboradores', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      monitoramentos_id: {
        type: Sequelize.INTEGER,
        references: { model: 'monitoramentos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
    })
  },

  down(queryInterface) {
    return queryInterface.sequelize.transaction(async (transacao) => {
      try {
        // Remove a tabela
        await queryInterface.dropTable('infoequipamentos', { transacao })

        // Remove o tipo ENUM
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_info_equipamentos_status;', { transacao })
      } catch (error) {
        // Reverte a transação em caso de erro
        await transacao.rollback()
        throw error
      }
    })
  },
}
