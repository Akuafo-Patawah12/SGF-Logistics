const socketIo= require("socket.io")
const cookie= require("cookie")
const jwt= require("jsonwebtoken");
const orderFunc = require("./OrdersNamespace");
const AdminPath = require("./AdminNamespace");



function initializeSocket(server){   
    const io = socketIo(server, {   //Creating connect between server and User Interface  "Realtime WebApp"
      transports: ['websocket',"polling"],
        cors: {
          origin:["https://sgf-logistics.vercel.app/"],
          methods:["POST,GET,PUT,DELETE"],
          allowedHeaders: ['Content-Type'],
          credentials: true
        }
      });

      
     


      const users={}

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
      const adminNamespace= io.of("/admin")
      

   
      io.of("/").use((socket,next)=>{
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

      adminNamespace.use((socket,next)=>{
        middleware(socket,next)
     })

     function setUser(socket){
      const userId=socket.user.id  // Extracting users id from socket
      users[userId]=socket.id 
    }
      
      io.of("/").on("connection",(socket)=>{
        console.log("connected to the default namespace")
        setUser(socket)
        socket.on("greet",(data)=>{
          console.log(data)
        })

        socket.on("disconnect",()=>{
          console.log("disconnected from default namespace")
          const userId = Object.keys(users).find((id) => users[id] === socket.id);

          // Remove the user from the `users` object if found
          if (userId) {
            delete users[userId];
            console.log(`User with ID ${userId} disconnected and was removed`);
          }
        })
      })

      trackingNamespace.on("connection",(socket)=>{
        setUser(socket)

        console.log("connected to the tracking namespace")
      })

      shippmentNamespace.on("connection",(socket)=>{
        setUser(socket)

        console.log("connected to the shippment namespace")
      })

      adminNamespace.on("connection",(socket)=>{
        setUser(socket)
          AdminPath(socket,ordersNamespace,users)
      })
      

      ordersNamespace.on("connection",(socket)=>{
          orderFunc(socket,adminNamespace,users)
        console.log("connected to the order namespace")
      })

      


      
      return io
    }

module.exports= initializeSocket