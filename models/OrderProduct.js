const Sequelize = require("sequelize")
const connection = require("../database/connection");
const Product = require("./Product")
const Order = require("./Order")

const OrderProduct = connection.define('order_product', {
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cost: {
        type: Sequelize.DECIMAL(15,2),
        allowNull: false
    }
});


module.exports = OrderProduct