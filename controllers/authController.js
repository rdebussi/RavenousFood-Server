const Jwt = require("jsonwebtoken")
const SECRET = "guitarra211"
const Credential = require("../models/Credentials")

const AuthController = {
    async GenerateToken (req, res) {
        var {email, password} = req.body

        try {
            if(email == undefined){throw Error ('undefined email')}
            if(password == undefined){throw Error('undefined password')}
            var user = await Credential.findOne({where:{email}})
            if(user == undefined){throw Error('user not found')}
            if(user.password === password){
                Jwt.sign({userId: user.id, email: user.email}, SECRET, {expiresIn: 300}, (err, token) =>{
                    if(err){
                        throw Error(err)
                    } else {
                        return res.json({auth: true, token})
                    }
                })
            } else {
                throw Error('invalid password')
            }
        } catch (err){
             res.status(401).json({error: err.message})
        }
    }
}



module.exports = AuthController