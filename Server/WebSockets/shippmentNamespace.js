


const shipping=(socket,users)=>{

   socket.on("create_shippment",async(data)=>{
    try{
      console.log(data)
      socket.emit("get_shippment",data)
    }catch(error){
        console.log(error)
    }
   }) 
   socket.on("disconnect",()=>{
    const userId = Object.keys(users).find((id) => users[id] === socket.id);

    // Remove the user from the `users` object if found
    if (userId) {
      delete users[userId];
      console.log(`User with ID ${userId} disconnected and was removed`);
    }
   })
   
return socket
   

}