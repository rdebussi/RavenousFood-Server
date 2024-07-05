const Product = require("../models/Product");
const Restaurant = require("../models/Restaurant")

const ProductServices = {
    async createProduct(req) {

        const bodyData = req.body
        try {
            const newProduct = await Product.create({
                name: bodyData.name,
                price: bodyData.price,
                category: bodyData.category,
                description: bodyData.description,
                product_img: bodyData.product_img,
                RestaurantId: bodyData.RestaurantId
            })
            return newProduct;
        } catch (err) {
            throw err;
        }
    },

    async getAllProducts () {
        const products = await Product.findAll({
            include: [{
                model: Restaurant,
                attributes: ['name', 'adress', 'profile_pic'] 
            }]
        });
        return products
    },

    async getProductById (id) {
        try {
            const product = await Product.findByPk(id)
            if(!product){
                throw new Error ("product not found!")
            }
            return product
        } catch (err) {
            throw err
        }
    },
    
    async getAllProductsByRestaurantId (RestaurantId) {
        try {
            const products = await Product.findAll({where: {RestaurantId}, 
                include: [{
                    model: Restaurant,
                    attributes: ['name', 'adress', 'profile_pic'] 
                }]})
            if(!products){
                throw new Error ("this restaurant doesn't have any product!")
            }
            return products
        }   catch(err){
            throw err
        }
    }
    ,

    async updateName (req) {
        const { name } = req.body
        const { id } = req.params
        try {
            const existingProduct = Product.findOne({where: {id}})
            if(!existingProduct){
                throw new Error ('this product doesnt exist')
            }
            await Product.update({name}, {where: {id}})
            const updatedName = await Product.findByPk(id)
            return updatedName.name
        }  catch(err){
            throw err
        }
    },

    async updatePrice (req) {
        const { price } = req.body
        const { id } = req.params
        try {
            const existingProduct= await Product.findByPk(id)
            if(!existingProduct){
                throw new Error('this product doesnt exist')
            }
            await Product.update({price}, {where: {id}})
            const updatedPrice = await Product.findByPk(id)
            return updatedPrice.price
        }  catch(err){
            throw err
        }
    },

    async updateCategory (req) {
        const { category } = req.body
        const { id } = req.params
        try {
            const existingProduct= await Product.findByPk(id)
            if(!existingProduct){
                throw new Error('this product doesnt exist')
            }
            await Product.update({category}, {where: {id}})
            const updatedCategory = await Product.findByPk(id)
            return updatedCategory.category
        }  catch(err){
            throw err
        }
    },

    async updateDescription (req) {
        const { description } = req.body
        const { id } = req.params
        try {
            const existingProduct= await Product.findByPk(id)
            if(!existingProduct){
                throw new Error('this product doesnt exist')
            }
            await Product.update({description}, {where: {id}})
            const updatedDescription = await Product.findByPk(id)
            return updatedDescription.description
        }  catch(err){
            throw err
        }
    },

    async deleteProduct (req) {
        const { id } = req.params
        try {
            const product = await Product.findByPk(id)
            if(!product){
                throw new Error('product not found')
            }
            await Product.destroy({where: {id}})
            return `product '${product.name}' deleted sucessfully'`
        } catch (err) {
            throw err
        }
    }
}

module.exports = ProductServices