const Sequelize = require("sequelize")
const connection = require("../database/connection")
const User = require("./User")
const Restaurant = require("./Restaurant")
const Product = require("./Product")
const OrderProduct = require("./OrderProduct")

const Order = connection.define('order', {
    restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Restaurant,
            key: 'id'
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Supondo que 'users' é o nome da tabela de usuários
            key: 'id'
        }
    },
    observation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cost: {
        type: Sequelize.DECIMAL(15,2),
        allowNull: true
    }
});


Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' });

OrderProduct.belongsTo(Order, { foreignKey: 'orderId' });
OrderProduct.belongsTo(Product, { foreignKey: 'productId' });
Order.hasMany(OrderProduct, { foreignKey: 'orderId' });
Product.hasMany(OrderProduct, { foreignKey: 'productId' });





module.exports = Order