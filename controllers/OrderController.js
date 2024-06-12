
const Services = require("../services/OrderServices")

const OrderController = {
    async createOrder(req, res) {
        try {
            const result = await Services.createOrder(req);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getOrdersByRestaurantId(req, res) {
        try {
            const result = await Services.getOrdersByRestaurantId(req)
            res.status(200).json(result)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    },

    async getOrdersByUserId(req, res) {
        try {
            const result = await Services.getOrdersByUserId(req)
            res.status(200).json(result)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    },
    
    async getOrderById(req, res) {
        try {
            const result = await Services.getOrderById(req)
            res.status(200).json(result)
        } catch(err){
            res.status(400).json({ error: err.message})
        }
    },

    async updateOrderStatus(req, res) {
        try {
            const order = await Services.updateOrderStatus(req);
            res.status(200).json(order);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = OrderController