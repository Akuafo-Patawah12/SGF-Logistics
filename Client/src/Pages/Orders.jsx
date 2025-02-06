import React,{useEffect, useState,useMemo} from 'react'

import io from "socket.io-client"
import {v4} from "uuid"
import { useNavigate,Link } from 'react-router-dom'
// Add this to your entry point, e.g., index.js or App.js





import "./Orders.css"







const Orders = () => {
  const navigate= useNavigate()


  const socket = useMemo(() =>io("http://localhost:4040/orders",{
    transports: ["websocket","polling"],
    withCredentials: true,
    secure: true
  }),[])

const[orders,setOrders] =useState([])
const [creatingOrder,setCreatingOrder]= useState(false);
const [formData, setFormData] = useState({
  shippingMark: "",
  trackingNumber: "",
  email: "",
  date: "",
  telephoneNumber: "",
  quantity: "",
  typesOfGoods: [],
  shippingOrigin: "",
  additionalDetails: "",
});
 


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




const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === "checkbox") {
    setFormData((prev) => ({
      ...prev,
      typesOfGoods: checked
        ? [...prev.typesOfGoods, value]
        : prev.typesOfGoods.filter((item) => item !== value),
    }));
  } else if (type === "radio") {
    setFormData((prev) => ({ ...prev, [name]: value }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData); // Check the collected data before sending

  socket.emit("submitOrder", formData, (response) => {
    if (response.status === "ok") {
      console.log("Shipment data submitted successfully!");
    } else {
      console.error("Failed to submit shipment data");
    }
  });
};


  return (
  <div className="order">

    <h3 style={{marginBlock:"20px 10px"}}>Request a free quote</h3>
    <form onSubmit={handleSubmit}>
      <div className="free_quote_input">
        <input type="text" name="shippingMark" placeholder="Shipping Mark" onChange={handleChange} />
        <input type="text" name="trackingNumber" placeholder="Tracking Number" onChange={handleChange} />
        <input type="text" name="email" placeholder="Email" onChange={handleChange} />
        <input type="text" name="date" placeholder="Date" onChange={handleChange} />
        <input type="text" name="telephoneNumber" placeholder="Telephone Number" onChange={handleChange} />
        <input type="text" name="quantity" placeholder="Quantity" onChange={handleChange} />
      </div>

      <div className="shipment_radio_checks">
        <div>
          <div style={{ fontWeight: "500", fontSize: "16px" }}>Types of Goods</div>
          <section className="checks">
            <label>
              <div className="input_container">
                <input type="checkbox" value="Fragile" onChange={handleChange} />
              </div>{" "}
              Fragile
            </label>
            <label>
              <div className="input_container">
                <input type="checkbox" value="Normal goods" onChange={handleChange} />
              </div>{" "}
              Normal goods
            </label>
            <label>
              <div className="input_container">
                <input type="checkbox" value="Hazardous" onChange={handleChange} />
              </div>{" "}
              Hazardous
            </label>
          </section>
        </div>

        <div>
          <div style={{ fontWeight: "500", fontSize: "16px" }}>Shipping Origin</div>
          <section className="radios">
            <label>
              <div className="input_container">
                <input type="radio" name="shippingOrigin" value="Guangzhou" onChange={handleChange} />
              </div>{" "}
              Guangzhou
            </label>
            <label>
              <div className="input_container">
                <input type="radio" name="shippingOrigin" value="Yiwu" onChange={handleChange} />
              </div>{" "}
              Yiwu
            </label>
          </section>
        </div>
      </div>

      <textarea
        className="textArea"
        name="additionalDetails"
        placeholder="Additional details: Any special requests or instructions"
        onChange={handleChange}
      ></textarea>

      <button type="submit" className="send_button">
        Submit
      </button>
    </form>     
 </div>
    
  )
}

export default Orders