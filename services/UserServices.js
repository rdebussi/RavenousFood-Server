const User = require("../models/User");

const UserServices = {
    async createUser(bodyData) {
        try {
            const newUser = await User.create(bodyData);
            return newUser;
        } catch (err) {
            throw err;
        }
    },

    async getUsers () {
        try {
            const users = await User.findAll()
            console.log(users)
            return users

        } catch(err) {
            throw err
        }
    }
}

module.exports = UserServices;
