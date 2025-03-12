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
const DB_connection = require("./Connections/Connection")
const router = require("./Router/Router")






app.use(cors({
    origin:["https://sfghanalogistics.com","http://localhost:3001"],
    credentials: true,
    methods:["POST,GET,PUT,DELETE"], 
    allowedHeaders: ["Content-Type"] // Common headers
}))


  


app.use("/",router)  // auth router


app.post('/add-admin', async (req, res) => {
    try {
      const newAdmin = new Admin(req.body);
      await newAdmin.save();
      res.status(201).send('Admin added successfully');
    } catch (error) {
      res.status(500).send('Error adding admin');
    }
  });


  app.get('/auth-status', (req, res) => {
    const token = req.cookies.refreshToken;
  
    if (!token) {
      return res.status(401).json({ authenticated: false });
    }
  
    return res.json({ authenticated: true });
  });
  

  
  
     

const server= http.createServer(app)

initializeSocket(server)  // This function return all the websockets


const port= process.env.PORT || 5040

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