const { Router } = require("express")
const routes = Router()
const UserController = require("../controllers/UserController")
const RestaurantController = require("../controllers/RestaurantController")
const AuthController = require("../controllers/authController")
const ProductController = require("../controllers/ProductController")
const auth = require("../middleware/auth")

//user
routes.post("/user", UserController.createUser)
routes.get("/user", auth, UserController.getUsers)
routes.get("/user/:id", UserController.getUserById)
routes.patch("/user/password/:id", UserController.updateUserPassword)
routes.patch("/user/adress/:id", UserController.updateAdress)
routes.patch("/user/name/:id", UserController.updateName)
routes.delete("/user/:id", UserController.deleteUser)


//restaurant
routes.post("/restaurant", RestaurantController.createRestaurant)
routes.get("/restaurant", RestaurantController.getRestaurants)
routes.get("/restaurant/:id", RestaurantController.getRestaurantById)
routes.patch("/restaurant/adress/:id", RestaurantController.updateRestaurantAddress)
routes.patch("/restaurant/name/:id", RestaurantController.updateRestaurantName)
routes.patch("/restaurant/telefone/:id", RestaurantController.updateRestaurantTelefone)
routes.delete("/restaurant/:id", RestaurantController.deleteRestaurant)

//login
routes.post("/login", AuthController.GenerateToken)


//products
routes.post("/product", ProductController.createProduct)
routes.get("/product", ProductController.getAllProducts)
routes.get("/product/restaurant/:RestaurantId", ProductController.getAllProductsByRestaurantId)
routes.patch("/product/name/:id", ProductController.updateProductName)
routes.patch("/product/price/:id", ProductController.updateProductPrice)
routes.patch("/product/category/:id", ProductController.updateCategory)
routes.patch("/product/description/:id", ProductController.updateProductDescription)
routes.delete("/product/:id", ProductController.deleteProduct)

module.exports = routes