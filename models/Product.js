const Sequelize = require("sequelize")
const connection = require("../database/connection")
const Restaurant = require("../models/Restaurant")

const Product = connection.define('products', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    RestaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})


Restaurant.hasMany(Product, { foreignKey: 'RestaurantId' });

Product.belongsTo(Restaurant, { foreignKey: 'RestaurantId' });



module.exports = Product