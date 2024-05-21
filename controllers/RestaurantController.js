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

    async getRestaurants(req, res){
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
    }
}

module.exports = RestaurantController