const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/connection")
const routes = require("./routes/index")
const User = require("./models/User")
const Restaurant = require("./models/Restaurant")


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


app.use('/', routes)

app.listen(1010, () => {
    console.log("server is running!")
})