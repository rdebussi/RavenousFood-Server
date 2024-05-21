const Restaurant = require("../models/Restaurant")

const Validator = {
    createRestaurantValidator(req) {

            let { name, adress, telefone } = req.body;

            const maxNameLength = 60;
            const maxAdressLength = 255;
            const maxTelefoneLength = 14;

            if (typeof name !== 'string' || name.length > maxNameLength) {
                throw new Error("Invalid name");
            }

            if (typeof adress !== 'string' || adress.length > maxAdressLength) {
                throw new Error("Invalid adress");
            }

            if (typeof telefone !== 'string' || telefone.length > maxTelefoneLength) {
                throw new Error("Invalid telephone number");
            }

         return true
    },

    getRestaurantByIdValidator(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid ID' + parsedId);
        }

        return true
    },
}

module.exports = Validator