 const Order= require("../DatabaseModels/Order")

const orderFunc=(socket)=>{
    socket.on("joinRoom",async()=>{
        socket.join("orderRoom")
        try{

            const queryOrder= await Order.find({})
        socket.emit("getOrders",queryOrder)
        }catch(error){
            console.log(error)
        }
    })
    return socket
}

module.exports= orderFunc