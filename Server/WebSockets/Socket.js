const socketIo= require("socket.io")
const cookie= require("cookie")
const jwt= require("jsonwebtoken");
const orderFunc = require("./OrdersNamespace");



function initializeSocket(server){   
    const io = socketIo(server, {   //Creating connect between server and User Interface  "Realtime WebApp"
        cors: {
          origin:["http://localhost:3000"],
          methods:["POST,GET,PUT,DELETE"],
          allowedHeaders: ['Content-Type'],
          credentials: true
        }
      });

      
     


      const user={}

      function middleware(socket,next){
        const cookieHeader = socket.request.headers.cookie; //getting http only cookies from socket
        
        if (!cookieHeader) {  //checking of the cookie exist in the headers
          
          return next(new Error('No cookies found'));
        }
      
        if (cookieHeader) {
          const cookies = cookie.parse(cookieHeader); // Parse cookies from the header
          const token = cookies.refreshToken; // Extract the refresh token
          if (!token) return next(new Error('Refresh token expired'));
    
           //decoding the token to extract user information
          jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => { 
            if (err) return next(new Error("Token can't be decoded"));
            socket.user = user; // Attach user to the socket
            next(); //proceed if there's no error
          });
        } else {
          next(new Error('Authentication error'));
        }
      }

      const trackingNamespace= io.of("/tracking")
      const shippmentNamespace= io.of('/shippment')
      const ordersNamespace= io.of("/orders")
      

   
      io.use((socket,next)=>{
         middleware(socket,next)
      })
      trackingNamespace.use((socket,next)=>{
        middleware(socket,next)
      })
      trackingNamespace.use((socket,next)=>{
        middleware(socket,next)
      })

      shippmentNamespace.use((socket,next)=>{
        middleware(socket,next)
      })

     
      ordersNamespace.use((socket,next)=>{
         middleware(socket,next)
      })


      
      io.on("connection",(socket)=>{
        console.log("connected to the default namespace")
        socket.on("greet",(data)=>{
          console.log(data)
        })

        socket.on("disconnect",()=>{
          console.log("disconnected from default namespace")
        })
      })

      trackingNamespace.on("connection",(socket)=>{

        console.log("connected to the tracking namespace")
      })

      shippmentNamespace.on("connection",(socket)=>{

        console.log("connected to the shippment namespace")
      })
      

      ordersNamespace.on("connection",(socket)=>{
          orderFunc(socket)
        console.log("connected to the order namespace")
      })

      


      
      return io
    }

module.exports= initializeSocket