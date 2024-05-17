const User = require("../models/User");
const Validator = require("../validator/validatorUser");
const UserServices = require("../services/UserServices.js");

const UserController = {

    async createUser(req, res) {
        try {
            Validator.createUserValidator(req);
            await UserServices.createUser(req.body);
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getUsers(req, res) {
        try {
            const users = await UserServices.getUsers()
            res.status(200).json({users})
        }   catch(err){
            res.status(400).json({error: err.message})
        }

    }
}

module.exports = UserController;
