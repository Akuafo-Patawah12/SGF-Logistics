


const shipping=(socket)=>{

   socket.on("create_shippment",async(data)=>{
    try{
      console.log(data)
      socket.emit("get_shippment",data)
    }catch(error){
        console.log(error)
    }
   }) 
   
return socket
   

}