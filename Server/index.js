const express= require("express")
const app=express()
const cors= require("cors")
const http= require("http")
const initializeSocket = require("./WebSockets/Socket")
const cookieParser= require("cookie-parser")
app.use(cookieParser())

app.use(express.urlencoded({extended:true}))
app.use(express.json());
const DB_connection = require("./DatabaseConnection/Connection")
const router = require("./AuthRoutes/Router")






app.use(cors({
    origin:["http://localhost:3000"],
    credentials: true,
    methods:["POST,GET,PUT,DELETE"], 
    allowedHeaders: ['Content-Type']
}))




const server= http.createServer(app)

initializeSocket(server)  // This function return all the websockets


app.use("/",router)  // auth router

async function start_Server(){
try{
     await DB_connection()  //call the database function to start databse

     server.listen(4040,() =>{
        console.log("server running on port 4040")
    })
}catch(error){
    console.log(error)
}

}

start_Server()