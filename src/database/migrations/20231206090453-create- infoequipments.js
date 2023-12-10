'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("CREATE TYPE enum_info_equipments_status as ENUM('ESTOQUE', 'EM USO')")

    await queryInterface.createTable('infoequipments', {
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
        type: 'enum_info_equipments_status',
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
      equipment_id: {
        type: Sequelize.INTEGER,
        references: { model: 'equipments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      collaborator_id: {
        type: Sequelize.INTEGER,
        references: { model: 'collaborators', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      monitoring_id: {
        type: Sequelize.INTEGER,
        references: { model: 'monitorings', key: 'id' },
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
        await queryInterface.dropTable('infoequipments', { transacao })

        // Remove o tipo ENUM
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_info_equipments_status;', { transacao })
      } catch (error) {
        // Reverte a transação em caso de erro
        await transacao.rollback()
        throw error
      }
    })
  },
}
