import React,{useEffect, useState,useMemo} from 'react'

import io from "socket.io-client"
import {v4} from "uuid"
import { useNavigate,Link } from 'react-router-dom'
// Add this to your entry point, e.g., index.js or App.js





import "./Orders.css"







const Orders = () => {
  const navigate= useNavigate()


  const socket = useMemo(() =>io("https://sgf-logistics-1.onrender.com/orders",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])

const[orders,setOrders] =useState([])
const [creatingOrder,setCreatingOrder]= useState(false);

 


 useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
    socket.on("receive",(data)=>{
      setCreatingOrder(false)
      setOrders(prev=>[data,...prev])
      console.log("order data",data)
    })

    socket.on('disconnect',(reasons)=>{
        console.log(reasons)
      })

      
      
    
    return()=>{
        socket.off('connect');
        socket.off("receive")
        socket.off('disconnect');
              
    }
},[socket,orders])







   








  

 

  

 


  

  // Set the current date as Invoice Date and format it
  


 

 

 



  

  return (
  <div className="order">

    <h3 style={{marginBlock:"20px 10px"}}>Requst a free quote</h3>
   <div className='free_quote_input'>
      <input type="text"  placeholder='Shipping Mark' />
      <input type="text"  placeholder='Tracking Number'/>
      <input type='text'  placeholder='Email' />
      <input type="text"  placeholder='Date'/>
      <input type="text" placeholder='Telephone Number' />
      <input type="text" placeholder='Quantity' />
   </div>

      <div className="shipment_radio_checks">    
            <div>
              <div style={{fontWeight:"500",fontSize:"16px"}}>Types of Goods</div>
              <section   className="checks">
               <label><div className="input_container"> <input type='checkbox' /></div> Fragile</label>
               <label><div className="input_container"> <input type='checkbox' /></div> Normal goods </label>
                <label><div className="input_container"><input type='checkbox' /></div> Harzardous</label>
              </section>
            </div>

            <div>
              <div style={{fontWeight:"500",fontSize:"16px"}}>Shipping Origin</div>
              <section className="radios">
               <label> <div className="input_container"><input type='radio' name="Origin"/> </div> Guangzhou</label>
               <label> <div className="input_container"><input type='radio' name="Origin"/> </div>  Yiwu </label>
              </section>
            </div>


            

            
          </div>
              <textarea className="textArea" placeholder='Additional details: Any special requests or instructions'></textarea>
         
              <button type="submit" className="send_button">Submit</button>
          </div>
    
  )
}

export default Orders