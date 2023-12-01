import { Sequelize } from 'sequelize'
import config from '../config/databases'

class Database {
  constructor() {
    this.connection = new Sequelize(config)
  }
}

export default new Database().connection
