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

    },

    async getUserById(req, res) {
        const { id } = req.params
        try {
            Validator.getUserByIdValidator(id)
            const user = await UserServices.getUserById(id)
            res.status(200).json({user})
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    },

    async updateUserEmail(req, res) {
        try {
            Validator.updateUserValidator(req)
            await UserServices.checkPassword(req)
            const updatedUserEmail = await UserServices.updateUserEmail(req)
            res.status(200).json({updatedUserEmail})
        }   catch(err) {
            res.status(400).json({error : err.message})
        }   

    },

    async updateUserPassword (req, res) {
        try {
            Validator.updateUserValidator(req)
            await UserServices.checkPassword(req)
            const result = await UserServices.updateUserPassword(req)
            res.status(200).json({result})
        }
       catch(err) {
        res.status(400).json({error: err.message})
        }
    },

    async updateUserType (req, res) {
        try {
            Validator.updateUserValidator(req)
            const result = await UserServices.updateType(req)
            res.status(200).json({result})
        } catch (err) {
            res.status(400).json({error : err.message})
        }
    },

    async deleteUser (req, res) {
        try {
            const result = await UserServices.deleteUser(req)
            res.status(200).json({result})
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
}

module.exports = UserController;
