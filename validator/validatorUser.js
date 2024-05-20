const User = require("../models/User")

const Validator = {
    createUserValidator(req) {

            let { email, password, type } = req.body;

            const maxEmailLength = 255;
            const maxPasswordLength = 128;
            const maxTypeLength = 50;

            if (typeof email !== 'string' || email.length > maxEmailLength) {
                throw new Error("Invalid email");
            }

            if (typeof password !== 'string' || password.length > maxPasswordLength) {
                throw new Error("Invalid password");
            }

            if (typeof type !== 'string' || type.length > maxTypeLength) {
                throw new Error("Invalid type");
            }

         return true
    },

    getUserByIdValidator(id) {
        console.log(id)
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid ID' + parsedId);
        }

        return true
    },

    updateUserValidator(req) {
        const { id } = req.params
        const { email, password, type } = req.body

        const maxEmailLength = 255;
            const maxPasswordLength = 128;
            const maxTypeLength = 50;

            if (typeof email !== 'string' || email.length > maxEmailLength) {
                throw new Error("Invalid email");
            }

            if (typeof password !== 'string' || password.length > maxPasswordLength) {
                throw new Error("Invalid password");
            }

            if (typeof type !== 'string' || type.length > maxTypeLength) {
                throw new Error("Invalid type");
            }

            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId) || parsedId <= 0) {
            throw new Error('Invalid ID');
            }

         return true
    }
}

module.exports = Validator;
