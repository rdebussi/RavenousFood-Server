const Sequelize = require("sequelize")

const connection = new Sequelize('ravenous', 'root', 'guitarra21', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
})

module.exports = connection;