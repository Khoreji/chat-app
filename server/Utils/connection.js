const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shanti_chat', 'root', 'Gk@#9691', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

module.exports = sequelize;