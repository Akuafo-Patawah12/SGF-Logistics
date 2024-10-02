const socketIo= require("socket.io")
const cookie= require("cookie")
const jwt= require("jsonwebtoken");
const orderFunc = require("./OrdersNamespace");

function initializeSocket(server) {   
    const io = socketIo(server, {   //Creating connect between server and User Interface  "Realtime WebApp"
        cors: {
          origin:"http://localhost:3000",
          methods: ['GET','POST'],
          allowedHeaders: ['Content-Type'],
          credentials: true
        }
      });

      const defaultNamespace= io.of("/")
      const trackingNamespace= io.of("/tracking")
      const shippmentNamespace= io.of('/shippment')
      const loginNamespace=  io.of("login")
      const signupNamespace= io.of("/signUp")
      const ordersNamespace= io.of("/orders")


      const user={}

      const socketMiddleware=(socket,next)=>{
        const cookies= socket.request.headers.cookie

        if(!cookies){
            return next(new Error("No cookies found"))
        }

        const parsed_cookies= cookie.parse(cookies)

        const token = cookies.refreshToken; // Extract the refresh token
         if (!token) return next(new Error('Refresh token expired'));

        jwt.verify(parsed_cookies,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(err){
                return next(new Error("Failed to decode token"))
            }
            socket.user=user
            next()
        })
      }

      
      

   
      defaultNamespace.use((socket,next)=>{
        socketMiddleware(socket,next)
      })
      trackingNamespace.use((socket,next)=>{
        socketMiddleware(socket,next)
      })
      trackingNamespace.use((socket,next)=>{
        socketMiddleware(socket,next)
      })

      shippmentNamespace.use((socket,next)=>{
        socketMiddleware(socket,next)
      })

      loginNamespace.use((socket,next)=>{
        socketMiddleware(socket,next)
      })

      signupNamespace.use((socket,next)=>{
        socketMiddleware(socket,next)
      })
      ordersNamespace.use((socket,next)=>{
         socketMiddleware(socket,next)
      })
      
      

      trackingNamespace.on("connection",(socket)=>{

        console.log("connected to the tracking namespace")
      })

      shippmentNamespace.on("connection",(socket)=>{

        console.log("connected to the shippment namespace")
      })
      
      loginNamespace.on("connection",(socket)=>{

        console.log("connected to the login namespace")
      })

      ordersNamespace.on("connection",(socket)=>{
          orderFunc(socket)
        console.log("connected to the sign up namespace")
      })

      signupNamespace.on("connection",()=>{

        console.log("connected to the sign up namespace")
      })


      
      return io
    }

module.exports= initializeSocket