const Sequelize = require("sequelize")
const connection = require("../database/connection")

const Credential = connection.define('credentials', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    credentiableType: {
        type: Sequelize.STRING,
        allowNull: false
    },

})




module.exports = Credential