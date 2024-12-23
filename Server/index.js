const express= require("express")
const app=express()
const socketIo= require("socket.io")
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
    origin:["https://sgf-logistics.vercel.app"],
    credentials: true,
    methods:["POST,GET,PUT,DELETE"], 
    allowedHeaders: ["Content-Type"] // Common headers
}))


  


app.use("/",router)  // auth router

const server= http.createServer(app)

initializeSocket(server)  // This function return all the websockets


const port= process.env.PORT || 4040

async function start_Server(){
try{
     await DB_connection()  //call the database function to start databse

     server.listen(port,() =>{
        console.log(`server running on port ${port}`)
    })
}catch(error){
    console.log(error)
}

}

start_Server()