const Validator = require("../validator/validatorRestaurant")
const Services = require("../services/RestaurantServices")

const RestaurantController = {
    async createRestaurant(req, res) {
        try {
            Validator.createRestaurantValidator(req);
            const result = await Services.createRestaurant(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getRestaurants(_, res){
        try{
            const restaurants = await Services.getRestaurants()
            res.status(200).json(restaurants)
        } catch(err) {
            res.status(400).json({error: err.message})
        }
    },

    async getRestaurantById (req, res) {
        const { id } = req.params
        try {
            Validator.getRestaurantByIdValidator(id)
            const restaurant = await Services.getRestaurantById(id)
            res.status(200).json(restaurant)
        }  catch(err){
            res.status(400).json({error: err.message})
        }
    },

    async updateRestaurantName (req, res) {
        const { name } = req.body
        try {
            Validator.updateNameValidator(name)
            const result = await Services.updateName(req)
            res.status(200).json({result})
        } catch (err) {
            res.status(400).json({error : err.message})
        }
    },


    async updateRestaurantAddress (req, res) {
        const { adress } = req.body
        try {
            Validator.updateAddressValidator(adress)
            const result = await Services.updateAddress(req)
            res.status(200).json({result})
        } catch (err) {
            res.status(400).json({error : err.message})
        }
    },

    async updateRestaurantTelefone (req, res){
        const { telefone } = req.body
        try {
            Validator.updateTelefoneValidator(telefone)
            const result = await Services.updateTelefone(req)
            res.status(200).json({result})
        } catch(err){
            res.status(400).json({error: err.message})
        }
    },

    async deleteRestaurant (req, res) {
        try {
            const result = await Services.deleteRestaurant(req)
            res.status(200).json({result})
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
}




module.exports = RestaurantController