const Sequelize = require("sequelize")
const connection = require("../database/connection")

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
})

Restaurant.sync({force: false}).then(() => {
    console.log("Restaurants table created sucessfully")
});

module.exports = Restaurant