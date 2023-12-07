'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('monitoramentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      monitorar: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      data_ultimo_reporte_ok: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      horário_para_monitorar: {
        type: Sequelize.INTEGER,
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
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('monitoramentos')
  },
}
