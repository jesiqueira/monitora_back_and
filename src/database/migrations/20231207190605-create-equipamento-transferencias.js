'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('equipamentotransferencias', {
        equipamento_id: {
          type: Sequelize.INTEGER,
          references: { model: 'equipamentos', key: 'id' },
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        transferencia_id: {
          type: Sequelize.INTEGER,
          references: { model: 'transferencias', key: 'id' },
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
      await queryInterface.addConstraint('equipamentotransferencias', {
        fields: ['equipamento_id', 'transferencia_id'],
        type: 'primary key',
        name: 'equipamentotransferencias_pk',
      })
      // console.error('Tabela criada com sucesso:')
    } catch (error) {
      // console.error('Erro ao criar a tabela userdescates:', error.message)
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipamentotransferencias')
  },
}
