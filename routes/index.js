const { Router } = require("express")
const routes = Router()
const UserController = require("../controllers/UserController")

//user
routes.post("/user", UserController.createUser)
routes.get("/user", UserController.getUsers)


module.exports = routes