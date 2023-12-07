'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('userdescartes', {
        user_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        descarte_id: {
          type: Sequelize.INTEGER,
          references: { model: 'descartes', key: 'id' },
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
      await queryInterface.addConstraint('userdescartes', {
        fields: ['user_id', 'descarte_id'],
        type: 'primary key',
        name: 'userdescarte_pk',
      })
      // console.log('Tabela userdescates criada com sucesso!')
    } catch (error) {
      // console.error('Erro ao criar a tabela userdescates:', error.message)
      throw error
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('userdescartes')
  },
}
