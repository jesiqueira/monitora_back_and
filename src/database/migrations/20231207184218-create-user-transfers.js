'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('usertransfers', {
        user_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        trasnfer_id: {
          type: Sequelize.INTEGER,
          references: { model: 'transfers', key: 'id' },
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
      await queryInterface.addConstraint('usertransfers', {
        fields: ['user_id', 'trasnfer_id'],
        type: 'primary key',
        name: 'usertransfer_pk',
      })
      // console.log('Tabela criada com sucesso!')
    } catch (error) {
      // console.error('Erro ao criar a tabela:', error.message)
      throw error
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('usertransfers')
  },
}
