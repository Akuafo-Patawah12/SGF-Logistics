const socketIo= require("socket.io")
const cookie= require("cookie")
const jwt= require("jsonwebtoken");
const orderFunc = require("./OrdersNamespace");
const AdminPath = require("./AdminNamespace");
const Tracking = require("./TrackingNamespace");
const Shipping = require("./ShipmetNamespace");
const rates = require("./DefaultSocket");



function initializeSocket(server){   
    const io = socketIo(server, {   //Creating connect between server and User Interface  "Realtime WebApp"
      transports: ['websocket',"polling"],
        cors: {
          origin:["https://sfghanalogistics.com","http://localhost:3000"],
          methods:["POST,GET,PUT,DELETE"],
          allowedHeaders: ['Content-Type'],
          credentials: true
        }
      });

      
     


      const users={}

      function middleware(socket,next){
        const cookieHeader = socket.request.headers.cookie; //getting http only cookies from socket
        
        if (!cookieHeader) {  //checking of the cookie exist in the headers
          
          return next(new Error('Refresh token expired'));
        }
      
        if (cookieHeader) {
          const cookies = cookie.parse(cookieHeader); // Parse cookies from the header
          const token = cookies.refreshToken; // Extract the refresh token
         
    
           //decoding the token to extract user information
          jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => { 
            if (err) return next(new Error("Refresh token expired"));
            socket.user = user; // Attach user to the socket
            next(); //proceed if there's no error
          });
        } else {
          next(new Error('Refresh token expired'));
        }
      }

      function middleware2(socket,next){
        const cookieHeader = socket.request.headers.cookie; //getting http only cookies from socket
        
        if (!cookieHeader) {  //checking of the cookie exist in the headers
          
          return next(new Error('No cookies found'));
        }
      
       
          const cookies = cookie.parse(cookieHeader); // Parse cookies from the header
          const token = cookies.refreshToken; // Extract the refresh token
          if (!token) return next(new Error('404: Refresh token not found'));
    
           //decoding the token to extract user information
          jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => { 
            if (err) return next(new Error("404: Refresh token not found"));
            socket.user = user; // Attach user to the socket
            if (socket.user.role !== "Admin") {
              return next(new Error(`403: Unauthorized`));
            }
            next(); //proceed if there's no error
          });
       }

      const trackingNamespace= io.of("/tracking")
      const ordersNamespace= io.of("/orders")
      const adminNamespace= io.of("/admin")
      const   shipmentNamespace= io.of("/shipment")
      

   
      
      trackingNamespace.use((socket,next)=>{
        middleware(socket,next)
      })
      
      ordersNamespace.use((socket,next)=>{
        setTimout(()=>{
          middleware(socket,next)
        },50)
         
      })

      
      adminNamespace.use((socket,next)=>{
        middleware2(socket,next)
     })

     shipmentNamespace.use((socket,next)=>{
         middleware2(socket,next)
   })

     function setUser(socket){
      const userId=socket.user.id  // Extracting users id from socket
      users[userId]=socket.id 
    }
      
      io.of("/").on("connection",(socket)=>{
        console.log("connected to the default namespace")
       

        rates(socket)
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
        Tracking(socket,trackingNamespace,users)

        console.log("connected to the tracking namespace")
      })

      shipmentNamespace.on("connection",(socket)=>{
        setUser(socket)
        Shipping(socket,ordersNamespace,users)

        console.log("connected to the tracking namespace")
      })

      

      adminNamespace.on("connection",(socket)=>{
        setUser(socket)
          AdminPath(socket,ordersNamespace,users)
      })
      

      ordersNamespace.on("connection",(socket)=>{
        setUser(socket)
          orderFunc(socket,io,adminNamespace,users)
        console.log("connected to the order namespace")
      })

      return io
    }

module.exports= initializeSocket