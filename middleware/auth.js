const Jwt = require("jsonwebtoken")
const SECRET = "guitarra211"


const auth = (req, res, next) => {
    const token = req.headers['x-access-token']
    Jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).end()
        req.userId = decoded.userId
        next()
    })
}



module.exports = auth