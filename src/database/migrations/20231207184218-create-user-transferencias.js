'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('usertransferencias', {
        user_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
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
      await queryInterface.addConstraint('usertransferencias', {
        fields: ['user_id', 'transferencia_id'],
        type: 'primary key',
        name: 'usertransferencias_pk',
      })
      // console.log('Tabela criada com sucesso!')
    } catch (error) {
      // console.error('Erro ao criar a tabela:', error.message)
      throw error
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('usertransferencias')
  },
}
