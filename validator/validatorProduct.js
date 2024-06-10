const Product = require("../models/Product")

const Validator = {
    createProductValidator(req) {

            let { name, price, category, description } = req.body;

            const maxNameLength = 60;
            const maxPriceLength = 10;
            const maxCategoryLength = 60;
            const maxDescriptionLength = 255;

            if (typeof name !== 'string' || name.length > maxNameLength) {
                throw new Error("Invalid name");
            }

            if (typeof price !== 'string' || price.length > maxPriceLength) {
                throw new Error("Invalid price");
            }

            if (typeof category !== 'string' || category.length > maxCategoryLength) {
                throw new Error("Invalid category");
            }

            if (typeof description !== 'string' || description.length > maxDescriptionLength) {
                throw new Error("Invalid category");
            }

         return true
    },

    IdValidator(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid ID' + parsedId);
        }

        return true
    },

    updateNameValidator(name) {
        const maxNameLength = 100
        if (typeof name !== 'string' || name.length > maxNameLength) {
            throw new Error("Invalid Name");
        }

        return true
    },

    updatePriceValidator(price) {
        
        const maxPriceLength = 10
        if (typeof price !== 'string' || price.length > maxPriceLength) {
            throw new Error("Invalid Price");
        }

        return true
    },

    updateCategoryValidator(category) {
        
        const maxCategoryLength = 60;
            if (typeof category !== 'string' || category.length > maxCategoryLength) {
                throw new Error("Invalid category");
            }

        return true
    },

    updateDescriptionValidator(description) {
        const maxDescriptionLength = 255;
            if (typeof description !== 'string' || description.length > maxDescriptionLength) {
                throw new Error("Invalid description");
            }
        return true
    }
}

module.exports = Validator