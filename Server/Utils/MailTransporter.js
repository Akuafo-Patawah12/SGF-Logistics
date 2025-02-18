const nodemailer= require("nodemailer")
require("dotenv").config


const transport=()=>{
    let transporter=nodemailer.createTransport({  //create transport allows to create communicating channel
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
                    })

                    return transporter
}

module.exports= transport