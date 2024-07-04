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
    profile_pic: {
        type: Sequelize.STRING,
        allowNull: false
    },
    openning_hours: {
        type: Sequelize.STRING,
        allowNull: false
    },
    background_img: {
        type: Sequelize.STRING,
        allowNull: true
    }
    ,
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