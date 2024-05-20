const User = require("../models/User");

const UserServices = {
    async createUser(bodyData) {
        const { email } = bodyData
        console.log(email)
        try {
            const existingUser = await User.findOne({ where: { email } })
            if(existingUser){
                throw new Error('A user with this email already exists')
            }
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
    },

    async getUserById (id) {
        try {
            const user = await User.findByPk(id)
            if(!user){
                throw new Error('user not found')
            }
            return user
        } catch (err) {
            throw err
        }
    },

    async checkPassword (req) {
        const { password } = req.body
        const { id } = req.params
        try {
            const user = await User.findByPk(id)
            if(!user){
                throw new Error('user not found')
            }
            if(user.password !== password){
                throw new Error('incorrect password')
            }
            return true
        } catch (err) {
            throw err
        }
    },

    async updateUserEmail (req) {
        const { id } = req.params
        const {email} = req.body

        try {
            const user = await User.findByPk(id)
            if(!user){
            throw new Error('user not found')
            }
            await User.update({email},{ where: {id : id}})
            const updatedUser = await User.findByPk(id)
            return updatedUser.email
        }  catch (err){
            throw err
        }
    },

    async updateUserPassword (req) {
        const { id } = req.params
        const { newPassword } = req.body
        
        try {
            const user = await User.findByPk(id)
            if(!user){
                throw new Error('user not found')
            }
            await User.update({password: newPassword},{where: {id : id}})
            return "new password updated"
        }  catch(err) {
            throw err
        } 
    },

    async updateType (req) {
        const { id } = req.params
        const { newType } = req.body

        try {
            const user = await User.findByPk(id)
            if(!user){
                throw new Error('user not found')
            }
            await User.update({type: newType},{where : {id : id}})
            const { type }  = await User.findByPk(id)
            return `user '${user.email}' type is now ${type}`
        }  catch(err) {
            throw err
        }
    },

    async deleteUser (req) {
        const { id } = req.params
        try {
            const user = await User.findByPk(id)
            if(!user){
                throw new Error('user not found')
            }
            await User.destroy({where: {id: id}})
            return `user '${user.email} deleted sucessfully'`
        } catch (err) {
            throw err
        }
    }
}

module.exports = UserServices;
