const { Router } = require("express")
const routes = Router()
const UserController = require("../controllers/UserController")

//user
routes.post("/user", UserController.createUser)
routes.get("/user", UserController.getUsers)
routes.get("/user/:id", UserController.getUserById)
routes.patch("/user/email/:id", UserController.updateUserEmail)
routes.patch("/user/password/:id", UserController.updateUserPassword)
routes.patch("/user/type/:id", UserController.updateUserType)
routes.delete("/user/:id", UserController.deleteUser)
module.exports = routes