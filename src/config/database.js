require('dotenv/config')

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  define: {
    timestamp: true, //cria duas colunas:createdAt e updateAt
    underscored: true, // nomenclatura _ (não camelCase) ex: customersGroup => customers_group
    underscoredAll: true,
  },
}
