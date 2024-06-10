const Validator = require("../validator/validatorProduct")
const Services = require("../services/ProductServices")

const ProductController = {
    async createProduct(req, res) {
        try {
            Validator.createProductValidator(req);
            const result = await Services.createProduct(req);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllProducts(_, res){
        try{
            const products = await Services.getAllProducts()
            res.status(200).json(products)
        } catch(err) {
            res.status(400).json({error: err.message})
        }
    },

    async getAllProductsByRestaurantId(req, res) {
        const { RestaurantId } = req.params
        try {
            Validator.IdValidator(RestaurantId)
            const products = await Services.getAllProductsByRestaurantId(RestaurantId)
            res.status(200).json(products)
        }  catch(err){
            res.status(400).json({error: err.message})
        }
    },

    async updateProductName (req, res) {
        const { name } = req.body
        try {
            Validator.updateNameValidator(name)
            const result = await Services.updateName(req)
            res.status(200).json({result})
        } catch (err) {
            res.status(400).json({error : err.message})
        }
    },


    async updateProductPrice (req, res) {
        const { price } = req.body
        try {
            Validator.updatePriceValidator(price)
            const result = await Services.updatePrice(req)
            res.status(200).json({result})
        } catch (err) {
            res.status(400).json({error : err.message})
        }
    },
    
    async updateCategory (req, res) {
        const { category } = req.body
        try {
            Validator.updateCategoryValidator(category)
            const result = await Services.updateCategory(req)
            res.status(200).json(result)
        }   catch(err) {
            res.status(400).json({error: err.message})
        }
    },

    async updateProductDescription (req, res){
        const { description } = req.body
        try {
            Validator.updateDescriptionValidator(description)
            const result = await Services.updateDescription(req)
            res.status(200).json({result})
        } catch(err){
            res.status(400).json({error: err.message})
        }
    },

    async deleteProduct (req, res) {
        try {
            const result = await Services.deleteProduct(req)
            res.status(200).json({result})
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
}




module.exports = ProductController