import React,{useEffect, useState,useMemo} from 'react'
import io from "socket.io-client"
import {v4} from "uuid"
import { useNavigate } from 'react-router-dom'



import "./Orders.css"

import ButtonLoader from '../Icons/ButtonLoader'
import { SendOutlined } from '@ant-design/icons'


const Orders = () => {


  const socket = useMemo(() =>io("http://localhost:4040/orders",{
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







    const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState([{ itemName: '', quantity: 1 }]);
const [location,setLocation]= useState({
    origin:"",
    destination:""
})

const togglePopup = () => {
  setIsOpen(!isOpen);
};

const handleItemChange = (index, field, value) => {
  const newItems = [...items];
  newItems[index][field] = value;
  setItems(newItems);
};

const addItem = () => {
  setItems([...items, { itemName: '', quantity: 1 ,weight:"",dimension:""}]);
};

const removeItem = (index) => {
  setItems(items.filter((_, i) => i !== index));
};

const handleSubmit = (e) => {
  e.preventDefault()
  setCreatingOrder(true)
  setTimeout(()=>{
    socket.emit("createOrder",{items,...location,tracking_id: v4()})
  },1000)
  
  // Reset form
  
  setItems([{itemName: '', quantity: 1 ,weight:"",dimension:""}]);
  togglePopup();
};

function deleteOrder(order_id,customer_id){  //function to delete an order
 
    setTimeout(()=>{
      socket.emit("deleteOrder",{order_id,customer_id})
  
    },5000)
      
  }


  return (
    <div>
        <div className="background-image">
          <div className="image_cover"></div>
              <h4 className='quote_header'>REQUEST A QUOTE</h4>
        </div>
        


<div>
  
</div>

        <div>
        <div  style={{padding:"16px"}}>
              <form onSubmit={handleSubmit}>

                <div  style={{marginBlock:"16px"}}>
                  <p>Contact Information</p>
                  <div className='contact_details'>
                  <input
                        className="contact_input"
                        type="text"
                        placeholder="Fullname"
                        
                        
                      />

                      <input
                        className="contact_input"
                        type="number"
                        max="10"
                        placeholder="Phone"
                        
                        
                      />

                  <input
                        className="contact_input"

                        
                        type="email"
                        placeholder="Email"
                        
                        
                      />
                  </div>
                  <p style={{marginTop:"30px",borderBottom:"4px solid #eee",paddingBottom:"10px"}}>Shipments Details</p>
                  <label  style={{display:"block", color:"#bbb",fontWeight:"600",marginBlock:"8px"}}>Items</label>
                  {items.map((item, index) => (
                    <div key={index}  style={{marginBlock:"8px",padding:"5px 0",display:"flex",alignItems:"center",border:"1px solid #ddd",borderInline:"none"}}>
                      <input
                        className="input"

                        
                        type="text"
                        placeholder="Item name"
                        value={item.itemName}
                        onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      />
                      <input
                        className="input"
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      />

<input
                        className="input"

                        
                        type="text"
                        placeholder="Weight"
                        value={item.itemName}
                        onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
                      />
                      
                      <button
                        type="button"
                        style={{color:"red"}}
                        onClick={() => removeItem(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <section style={{display:"flex" ,justifyContent:"space-between"}}>
                      <input type="text" 
                       className='input'
                       
                       name="location" 
                       id="origin" 
                       onChange={(e) => setLocation({ ...location, origin: e.target.value })}
                       placeholder='Origin'
                       
                       />

                      <input type="text" 
                      className='input'
                      
                      name="location" 
                      id="destination"
                      onChange={(e) => setLocation({ ...location, destination: e.target.value })}
                       placeholder='Destination'/>
                  </section>
                  <section className='shipment_note'>
                    <p>Please provide the weight in pounds</p>
                    
                  </section>
                  <button
                    type="button"
                    className="add_btn"
                    onClick={addItem}
                  >
                    Add Item
                  </button>
                </div>
                
                <fieldset className='field' style={{border:"1px solid #ddd",padding:"10px 0",borderRadius:"5px",marginBottom:"20px"}}>
                  <legend>Special handling</legend>

                  <div>
                  <label className="label">
                  <input type="checkbox" ></input>
                  Hazardious
                  </label>
                  </div>

                  
                  
                  <div>
                  <label className="label">
                  <input type="checkbox" ></input>
                  Temperature Sensity
                  </label>
                  </div>
                  
                  <div>
                  <label className="label">
                  <input type="checkbox" ></input>
                  Fragile
                  </label>
                  </div>

                </fieldset>
                <div style={{display:"flex",flexDirection:"column"}}>
                  <textarea cols="30" rows="5" style={{maxWidth:"100%",background:"#eee",border:"1px solid #ddd",borderRadius:"5px"}} placeholder="Add description about items here"></textarea>
                  <label className='shipment_note'>Please provide any additional information that may be helpful in providing an accurate quote.</label>
                </div>


                <div style={{display:"flex",gap:"10px",justifyContent:"flex-end",marginTop:"20px"}} >
                  <button
                    type="button"
                    className="btn"
                    onClick={togglePopup}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="animated-button"
                    style={{display:"flex",gap:"5px",background:"#A7C756",border:"1px solid #555",color:"white",paddingBlock:"8px",paddingInline:"16px",borderRadius:"10px"}}
            
                  >
                    Submit
                     <SendOutlined />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {creatingOrder && <div className='creating_order'>Creating Order... <ButtonLoader /></div> }

          
        </div>
    
  )
}

export default Orders