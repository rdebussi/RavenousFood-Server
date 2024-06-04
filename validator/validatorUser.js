const User = require("../models/User")

const Validator = {
    createUserValidator(req) {

            let { email, password, adress } = req.body;

            const maxEmailLength = 255;
            const maxPasswordLength = 128;
            const maxAdressLength = 255;

            if (typeof email !== 'string' || email.length > maxEmailLength) {
                throw new Error("Invalid email");
            }

            if (typeof password !== 'string' || password.length > maxPasswordLength) {
                throw new Error("Invalid password");
            }

            if (typeof adress !== 'string' || adress.length > maxAdressLength) {
                throw new Error("Invalid adress");
            }

         return true
    },

    getUserByIdValidator(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid ID' + parsedId);
        }

        return true
    },

    updateAdressValidator(req) {
        const { id } = req.params
        const { newAdress } = req.body

        const maxAdressLength = 255

            if (typeof newAdress !== 'string' || newAdress.length > maxAdressLength) {
                throw new Error("Invalid Adress");
            }


            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid ID');
            }

         return true
    },

    updateNameValidator(req) {
        const { id } = req.params
        const { newUserName } = req.body

        const maxNameLength = 255
            if (typeof newUserName !== 'string' || newUserName.length > maxNameLength) {
                throw new Error("Invalid name");
            }
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid ID');
            }

         return true
    }
}

module.exports = Validator;
