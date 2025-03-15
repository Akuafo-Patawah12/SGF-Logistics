const socketIo= require("socket.io")
const cookie= require("cookie")
const jwt= require("jsonwebtoken");
const util= require("util")
const orderFunc = require("./OrdersNamespace");
const AdminPath = require("./AdminNamespace");
const Tracking = require("./TrackingNamespace");
const Shipping = require("./ShipmetNamespace");
const rates = require("./DefaultSocket");



function initializeSocket(server){   
    const io = socketIo(server, {   //Creating connect between server and User Interface  "Realtime WebApp"
      transports: ['websocket',"polling"],
        cors: {
          origin:["https://sfghanalogistics.com","http://localhost:5173"],
          methods:["POST,GET,PUT,DELETE"],
          allowedHeaders: ['Content-Type'],
          credentials: true
        }
      });

      
     


      const users={}

      

const verifyToken = util.promisify(jwt.verify); // Convert jwt.verify into async/await

async function middleware(socket, next) {
  await new Promise(resolve => setTimeout(resolve, 200));
  try {
    const cookieHeader = socket.request.headers.cookie; // Getting HTTP-only cookies from socket
    console.log("Cookie Header:", cookieHeader);

    if (!cookieHeader) {
      return next(new Error("Refresh token expired"));
    }

    const cookies = cookie.parse(cookieHeader); // Parse cookies from the header
    const token = cookies.refreshToken; // Extract the refresh token

    console.log("Extracted Token:", token);
    if (!token) {
      return next(new Error("Refresh token expired"));
    }

    // Verify the token (now async)
    const user = await verifyToken(token, process.env.REFRESH_TOKEN_SECRET).catch((err) => {
      console.error("JWT Verification Error:", err.message);
      throw new Error("Refresh token expired");
    });

    console.log("Verified User:", user);
    socket.user = user; // Attach user to the socket
    next(); // Proceed if no errors
  } catch (err) {
    console.error("Socket Middleware Error:", err.message);
    return next(new Error("Refresh token expired"));
  }
}



async function middleware2(socket, next) {
  await new Promise(resolve => setTimeout(resolve, 200));
  try {
    const cookieHeader = socket.request.headers.cookie; // Getting HTTP-only cookies from socket
    console.log("Cookie Header:", cookieHeader);

    if (!cookieHeader) {
      return next(new Error("No cookies found"));
    }

    const cookies = cookie.parse(cookieHeader); // Parse cookies from the header
    const token = cookies.refreshToken; // Extract the refresh token

    console.log("Extracted Token:", token);
    if (!token) {
      return next(new Error("404: Refresh token not found"));
    }

    // Verify the token (now async)
    const user = await verifyToken(token, process.env.REFRESH_TOKEN_SECRET).catch((err) => {
      console.error("JWT Verification Error:", err.message);
      throw new Error("404: Refresh token not found");
    });

    console.log("Verified User:", user);
    socket.user = user; // Attach user to the socket

    if (socket.user.role !== "Admin") {
      return next(new Error("403: Unauthorized"));
    }

    next(); // Proceed if no errors
  } catch (err) {
    console.error("Socket Middleware Error:", err.message);
    return next(err); // Pass the original error
  }
}

      const trackingNamespace= io.of("/tracking")
      const ordersNamespace= io.of("/orders")
      const adminNamespace= io.of("/admin")
      const   shipmentNamespace= io.of("/shipment")
      

   
      
      trackingNamespace.use((socket,next)=>{
        middleware(socket,next)
      })
      
      ordersNamespace.use((socket,next)=>{
          middleware(socket,next)
        
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