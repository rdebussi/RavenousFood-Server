const Restaurant = require("../models/Restaurant");

const RestaurantServices = {
    async createRestaurant(bodyData) {
        const { name } = bodyData
        try {
            const existingRestaurant = await Restaurant.findOne({ where: { name } })
            if(existingRestaurant){
                throw new Error('This name already exists!')
            }
            const newRestaurant = await Restaurant.create(bodyData);
            return newRestaurant;
        } catch (err) {
            throw err;
        }
    },

    async getRestaurants () {
       try {
        const restaurants = Restaurant.findAll()
        if(!restaurants){
            throw new Error("no restaurants found!")
        }
        return restaurants
       } catch(err) {
        throw err
       }
    },

    async getRestaurantById (id) {
        try {
            const restaurant = await Restaurant.findByPk(id)
            if(!restaurant){
                throw new Error ("restaurant not found!")
            }
            return restaurant
        } catch (err) {
            throw err
        }
    }
}

module.exports = RestaurantServices