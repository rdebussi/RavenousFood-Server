const User = require("../models/User");
const connection = require("../database/connection")
const Credential = require("../models/Credentials")

const UserServices = {
    async createUser(bodyData) {
        let transaction

        try {
            // Iniciar uma transação
            transaction = await connection.transaction();

            const existingCredential = await Credential.findOne({ where: { email: bodyData.email } })
            if(existingCredential){
                throw new Error('A User with this email already exists')
            }

            const newCredential = await Credential.create({
                email: bodyData.email,
                password: bodyData.password,
                credentiableType: 'user'
            }, { transaction });

            const newUser = await User.create({
                name: bodyData.name,
                adress: bodyData.adress,
                credentiableId: newCredential.id
            }, { transaction });

            // Commit da transação
            await transaction.commit();

            return newUser;
        } catch (err) {
            throw err;
        }
    },

    async getUsers () {
        try {
            const users = await User.findAll()
            return users

        } catch(err) {
            throw err
        }
    },

    async getUserById (id) {
        try {
            const user = await User.findByPk(id, {
                include: [{
                    model: Credential,
                    attributes: ['email'] 
                }]
            })
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
            const credentials = await Credential.findByPk(user.credentiableId)

        if(password !== credentials.password){
            throw new Error('invalid password')
        }
            return true
        } catch (err) {
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

    async updateUserAdress (req) {
        const { id } = req.params
        const { newAdress } = req.body
        
        try {
            const user = await User.findByPk(id)
            if(!user){
                throw new Error('user not found')
            }
            await User.update({adress: newAdress},{where: {id : id}})
            return "new adress updated"
        }  catch(err) {
            throw err
        } 
    },
    
    async updateUserName (req) {
        const { id } = req.params
        const { newUserName } = req.body
        
        try {
            const user = await User.findByPk(id)
            if(!user){
                throw new Error('user not found')
            }
            await User.update({name: newUserName},{where: {id : id}})
            return "new name updated"
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
            await Credential.destroy({where: {id : user.credentiableId}})
            return `user '${user.name} deleted sucessfully'`
        } catch (err) {
            throw err
        }
    }
}

module.exports = UserServices;
