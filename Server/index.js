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
const DB_connection = require("./DatabaseConnection/Connection")
const router = require("./AuthRoutes/Router")






app.use(cors({
    origin:["http://localhost:3000"],
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

  app.post('/api/enquiries', async (req, res) => {
      const newEnquiry= req.body
     try {
      
  
      // Send email
      const mailOptions = {
        from: '',
        to: 'recipient-email@gmail.com',
        subject: 'New Enquiry Received',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,//email that will be sending messages from the server to the client
            pass: process.env.PASSWORD  //generated password form less secured apps from Google
        },
        tls: {
            rejectUnauthorized: false, //do not reject self-signed certificates  
          },
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #333;">New Enquiry Received</h2>
            <p><strong>Name:</strong> ${newEnquiry.name} ${newEnquiry.lastName}</p>
            <p><strong>Email:</strong> ${newEnquiry.email}</p>
            <p><strong>WhatsApp:</strong> ${newEnquiry.whatsappNumber}</p>
            <p><strong>Shipment Type:</strong> ${newEnquiry.shipmentType}</p>
            <p><strong>Message:</strong></p>
            <p>${newEnquiry.message}</p>
          </div>
        `,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Error submitting enquiry');
        } else {
          console.log('Email sent:', info.response);
          res.status(201).send('Enquiry submitted successfully');
        }
      });
    } catch (error) {
      res.status(500).send('Error submitting enquiry');
    }
  });

const server= http.createServer(app)

initializeSocket(server)  // This function return all the websockets


const port= process.env.PORT || 4040

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