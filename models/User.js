const Sequelize = require("sequelize")
const connection = require("../database/connection")

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({force: false}).then(() => {
    console.log('User Table has been created sucesfully!')
});

module.exports = User