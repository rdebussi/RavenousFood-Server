const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/connection")
const routes = require("./routes/index")
const User = require("./models/User")
const Credential = require("./models/Credentials")
const Restaurant = require("./models/Restaurant")
const Product = require("./models/Product")
const Order = require("./models/Order")
const OrderProduct = require("./models/OrderProduct")


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

connection
    .authenticate()
    .then(() => {
        console.log("database ok")
    }).catch((err) => {
        console.error(err)
    })



async function startServer() {
    try {
        await connection.authenticate();
        console.log("Database connected!");

        
        await Promise.all([
            //connection.query("ALTER TABLE products MODIFY price DECIMAL(15, 2)").then(() => {console.log('ok')}),
            /* Sincroniza todas as tabelas
            connection.query("SET FOREIGN_KEY_CHECKS = 0"),
        // Excluir a tabela
            connection.query("DROP TABLE IF EXISTS orders"),
            connection.query("DROP TABLE IF EXISTS order_products"),*/
            User.sync({ force: false }),
            Credential.sync({ force: false }),
            Restaurant.sync({ force: false }),
            Product.sync({force: false}),
            Order.sync({force: false}),
            OrderProduct.sync({force: false})
        ]);

        console.log("All tables synchronized!");

        // Inicia o servidor Express
        app.use('/', routes);
        app.listen(1010, () => {
            console.log("Server is running on port 1010!");
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

// Chama a função para iniciar o servidor
startServer();