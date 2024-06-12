const Product = require("../models/Product");
const Order = require("../models/Order");
const OrderProduct = require("../models/OrderProduct");
const connection = require("../database/connection");
const Restaurant = require("../models/Restaurant")
const User = require("../models/User")

const OrderServices = {
    async createOrder(req) {
        const bodyData = req.body;
        const { products, restaurantId, userId, observation, status } = bodyData;
        let transaction;

        try {
            transaction = await connection.transaction();

            // Cria a nova order
            const newOrder = await Order.create({
                restaurantId,
                userId,
                observation,
                status: 'pending'
            }, { transaction });

            let totalPrice = 0;

            // Itera sobre cada produto e insere na tabela OrderProduct
            for (const product of products) {
                const { productId, quantity } = product;
                const productData = await Product.findByPk(productId, { transaction });

                if (!productData) {
                    throw new Error(`Produto com ID ${productId} não encontrado`);
                }

                const price = parseFloat(productData.price); // Converta o preço para um número
                if (isNaN(price) || price <= 0) {
                    throw new Error(`Valor de preço inválido para o produto ID ${productId}`);
                }

                const cost = parseFloat((productData.price * quantity).toFixed(2));
                totalPrice += cost;

                await OrderProduct.create({
                    orderId: newOrder.id,
                    productId,
                    quantity,
                    cost
                }, { transaction });
            }

            // Atualiza a order com o preço total calculado
            newOrder.cost = parseFloat(totalPrice.toFixed(2)); // Formata o totalPrice para duas casas decimais
            await newOrder.save({ transaction });

            // Comita a transação
            await transaction.commit();

            return true;
        } catch (err) {
            if (transaction) await transaction.rollback();
            throw err;
        }
    },

    async getOrdersByRestaurantId(req) {
        const { restaurantId } = req.params
        try {
            const orders = await Order.findAll({
                where: { restaurantId },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'adress'] // Inclui apenas o nome do restaurante
                    },
                    {
                    model: OrderProduct,
                    attributes: ['productId', 'quantity', 'cost'],
                    include: [{ model: Product,
                        attributes: ['name', 'price']
                    }]
                }]
            });
            return orders
        } catch(err) {
            throw err
        }
    },

    async getOrdersByUserId(req) {
        const { userId } = req.params
        console.log(userId)
        try {
            const orders = await Order.findAll({
                where: { userId },
                include: [
                    {
                        model: Restaurant,
                        attributes: ['name','adress'] // Inclui apenas o nome do restaurante
                    },
                    {
                    model: OrderProduct,
                    attributes: ['productId', 'quantity', 'cost'],
                    include: [{ model: Product,
                        attributes: ['name', 'price']
                    }]
                }]
            });
            return orders
        } catch(err) {
            throw err
        }
    },

    async getOrderById(req) {
        const { id }= req.params

        try {
            const order = await Order.findByPk(id, {
                include: [{
                    model: OrderProduct,
                    attributes: ['productId', 'quantity', 'cost'],
                    include: [{
                        model: Product,
                        attributes: ['name', 'price']
                    }]
                }]
            })
            return order
        } catch(err){
            throw err
        }
    },

    async updateOrderStatus(req) {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!['pending', 'em andamento', 'completed', 'cancelled'].includes(status)) {
            throw new Error('Status inválido');
        }

        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                throw new Error(`Pedido com ID ${orderId} não encontrado`);
            }

            order.status = status;
            await order.save();

            return order;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = OrderServices;
