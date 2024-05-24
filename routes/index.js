const { Router } = require("express")
const routes = Router()
const UserController = require("../controllers/UserController")
const RestaurantController = require("../controllers/RestaurantController")

//user
routes.post("/user", UserController.createUser)
routes.get("/user", UserController.getUsers)
routes.get("/user/:id", UserController.getUserById)
routes.patch("/user/email/:id", UserController.updateUserEmail)
routes.patch("/user/password/:id", UserController.updateUserPassword)
routes.patch("/user/type/:id", UserController.updateUserType)
routes.delete("/user/:id", UserController.deleteUser)


//restaurant
routes.post("/restaurant", RestaurantController.createRestaurant)
routes.get("/restaurant", RestaurantController.getRestaurants)
routes.get("/restaurant/:id", RestaurantController.getRestaurantById)
routes.patch("/restaurant/adress/:id", RestaurantController.updateRestaurantAddress)
routes.patch("/restaurant/name/:id", RestaurantController.updateRestaurantName)
routes.patch("/restaurant/telefone/:id", RestaurantController.updateRestaurantTelefone)
routes.delete("/restaurant/:id", RestaurantController.deleteRestaurant)

module.exports = routes