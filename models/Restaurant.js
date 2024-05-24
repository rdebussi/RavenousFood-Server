const Sequelize = require("sequelize")
const connection = require("../database/connection")
const Credential = require("./Credentials")

const Restaurant = connection.define('restaurants', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    credentiableId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    }
})



/*Credential.hasOne(Restaurant, {
    foreignKey: 'credentiableId',
})*/

Credential.hasOne(Restaurant, { foreignKey: 'credentiableId' });

Restaurant.belongsTo(Credential, { foreignKey: 'credentiableId' });



module.exports = Restaurant