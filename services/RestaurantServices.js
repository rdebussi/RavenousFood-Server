const Credential = require("../models/Credentials")
const Restaurant = require("../models/Restaurant");
const connection = require("../database/connection")


const RestaurantServices = {
    async createRestaurant(bodyData) {
        
        let transaction

        try {
            // Iniciar uma transação
            transaction = await connection.transaction();

            const existingRestaurant = await Restaurant.findOne({ where: { name: bodyData.name } })
            if(existingRestaurant){
                throw new Error('A Restaurant with this name already exists')
            }
            const existingCredential = await Credential.findOne({ where: { email: bodyData.email } })
            if(existingCredential){
                throw new Error('A Restaurant with this email already exists')
            }

            const newCredential = await Credential.create({
                email: bodyData.email,
                password: bodyData.password,
                credentiableType: 'restaurant'
            }, { transaction });

            const newRestaurant = await Restaurant.create({
                name: bodyData.name,
                adress: bodyData.adress,
                telefone: bodyData.telefone,
                credentiableId: newCredential.id
            }, { transaction });

            // Commit da transação
            await transaction.commit();

            return newRestaurant;
        } catch (err) {
            throw err;
        }
    },

    async getRestaurants () {
        const restaurants = await Restaurant.findAll({
            include: [{
                model: Credential,
                attributes: ['email'] 
            }]
        });
        return restaurants
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
    },

    async updateName (req) {
        const { name } = req.body
        const { id } = req.params
        try {
            const existingRestaurant = Restaurant.findOne({where: {id}})
            if(!existingRestaurant){
                throw new Error ('this restaurant doesnt exist')
            }
            const existingName = Restaurant.findOne({where: {name}})
            /*if(existingName){
                throw new Error ('This name is alread in use!')
            }*/
            await Restaurant.update({name}, {where: {id}})
            const updatedName = await Restaurant.findByPk(id)
            return updatedName.name
        }  catch(err){
            throw err
        }
    },

    async updateAddress (req) {
        const { adress } = req.body
        const { id } = req.params
        try {
            const existingRestaurant = await Restaurant.findByPk(id)
            if(!existingRestaurant){
                throw new Error('this restaurant doesnt exist')
            }
            await Restaurant.update({adress}, {where: {id}})
            const updatedAdress = await Restaurant.findByPk(id)
            return updatedAdress.adress
        }  catch(err){
            throw err
        }
    },

    async updateTelefone (req) {
        const { telefone } = req.body
        const { id } = req.params
        try {
            const existingRestaurant = await Restaurant.findByPk(id)
            if(!existingRestaurant){
                throw new Error('this restaurant doesnt exist')
            }
            await Restaurant.update({telefone}, {where: {id}})
            const updatedTelefone = await Restaurant.findByPk(id)
            return updatedTelefone.telefone
        }  catch(err){
            throw err
        }
    },

    async deleteRestaurant (req) {
        const { id } = req.params
        try {
            const restaurant = await Restaurant.findByPk(id)
            if(!restaurant){
                throw new Error('restaurant not found')
            }
            await Restaurant.destroy({where: {id: id}})
            return `restaurant '${restaurant.name}' deleted sucessfully'`
        } catch (err) {
            throw err
        }
    }
}

module.exports = RestaurantServices