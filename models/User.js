const Sequelize = require("sequelize")
const connection = require("../database/connection")
const Credential = require("./Credentials")

const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    credentiableId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    }
})

Credential.hasOne(User, { foreignKey: 'credentiableId' });

User.belongsTo(Credential, { foreignKey: 'credentiableId' });

module.exports = User