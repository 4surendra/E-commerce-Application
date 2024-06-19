/**
 * This will be the starting file of the project
 */

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json())

/**
 * Create an admin user at the starting of the application if not already present
 */

// Connection with mongodb
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error while connecting to the mongoDB")
})

db.once("open", ()=>{
    console.log("Connected to MongoDB")
    init()
})

async function init(){
    let user = await user_model.findOne({userId : "admin"})

    if(user){
        console.log("Admin is already present")
        return
    }

    try{
        user = await user_model.create({
            name: "Amit Singh",
            age: 35,
            mobile: "7654321098",
            email: "amit@example..com",
            address: "789, DEF Street, UVW City",
            aadharCardNumber: "123456789015",
            password: bcrypt.hashSync("admin",8),
            role: "admin"
        })

        console.log("Admin is created", user)

    }catch(err){
        console.log("Error while create admin", err)
    }
}

/**
 * Stich the route to the server
 */

require("./routes/auth.rout")(app)
require("./routes/category.route")(app)

/**
 * Start the server
 */
app.listen(server_config.PORT, ()=>{
    console.log("Server started at port num : ", server_config.PORT)
})

