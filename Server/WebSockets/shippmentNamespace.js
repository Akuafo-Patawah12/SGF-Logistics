const nodemailer= require("nodemailer")
const tls= require("tls")
const order = require("../DatabaseModels/Order")

const mailer = async(email)=>{
  try{
     
      if(email){ 
                           
      let transporter=nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          },
          tls: {
              rejectUnauthorized: false, // do not reject self-signed certificates
            },
      });  
      let mailOptions = {
          from: '"Do Not Reply" <' + process.env.EMAIL + '>',
          to: email,
          subject: 'SF logistics',
          text: "Shipment has started, to track shipment click the link below.",
          html: `<a href="http://localhost:3000/Tracking/${confirm._id}">➡️ Track shipment ⬅️</a>`
      }; 
      
     transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log("success")
        }}); 
     
  }   
    
  }catch(err){
      console.log("internal server error")
  }
}

const shipping=(socket,users)=>{

   socket.on("create_shippment",async(data)=>{

    try{
      console.log(data)
      const Order=  await order.findOne({tracking_id:tracking_id})
      socket.emit("get_shippment",data)
      mailer(Order.email)
    }catch(error){
        console.log(error)
    }
   }) 


   socket.on("track",({tracking_id})=>{
      
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

module.exports= shipping