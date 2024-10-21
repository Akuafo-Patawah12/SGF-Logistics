import React,{useEffect, useState,useMemo} from 'react'
import io from "socket.io-client"
import {v4} from "uuid"
import { useNavigate } from 'react-router-dom'



import "./Orders.css"

import ButtonLoader from '../Icons/ButtonLoader'


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
  setItems([...items, { itemName: '', quantity: 1 }]);
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
  
  setItems([{itemName: '', quantity: 1 }]);
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
  <select>
      <option value="Air Freight">Air Freight</option>
      <option value="Ship Freight">Ship Freight</option>
      <option value="Door to door">Door to door</option>
  </select>
</div>

        <div>
        <div  style={{padding:"16px"}}>
              <form onSubmit={handleSubmit}>

                <div  style={{marginBlock:"16px"}}>
                  <div>
                  <input
                        className="input"

                        
                        type="text"
                        placeholder="Email"
                        
                        
                      />
                  </div>
                  <label  style={{display:"block", color:"#bbb",fontWeight:"600",marginBlock:"8px"}}>Items</label>
                  {items.map((item, index) => (
                    <div key={index}  style={{marginBlock:"8px",display:"flex",alignItems:"center"}}>
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
                      <button
                        type="button"
                        style={{color:"red"}}
                        onClick={() => removeItem(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <section style={{display:"flex"}}>
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
                  <button
                    type="button"
                    
                    className=".btn"
                    onClick={addItem}
                  >
                    Add Item
                  </button>
                </div>
                <div>
                  <label>
                  <input type="checkbox" ></input>
                  Hazardious
                  </label>

                  
                  

                  <label>
                  <input type="checkbox" ></input>
                  Temperature Sensity
                  </label>

                  <label>
                  <input type="checkbox" ></input>
                  Fragile
                  </label>

                </div>
                <div>
                  <textarea></textarea>
                </div>

                <div style={{display:"flex",justifyContent:"flex-end"}} >
                  <button
                    type="button"
                    className="btn"
                    onClick={togglePopup}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{background:"blue",color:"white",paddingBlock:"8px",paddingInline:"16px",borderRadius:"10px"}}
            
                  >
                    Submit
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