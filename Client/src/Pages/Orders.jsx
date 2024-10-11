import React,{useEffect, useState,useMemo} from 'react'
import io from "socket.io-client"
import {v4} from "uuid"
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from "jwt-decode"


import "./Orders.css"
import OrderTable from './OrderTable'


const Orders = () => {


const socket=useMemo(()=> io("sgf-logistics-backend.vercel.app/orders",{
    transports:["websocket","polling"],
    withCredentials: true,
  secure: true
}),[])

const[orders,setOrders] =useState([])
const navigate= useNavigate()   
const[Id,setId]= useState("") //id extracted from access token
const [creatingOrder,setCreatingOrder]= useState(false);

 useEffect(() => {
   const token =localStorage.getItem("accesstoken")  // extracting token from local storage
   if (token) {
     try {
       const decodedToken = jwtDecode(token); //decoding the content of the token
       setId(decodedToken.id); 

       socket.emit("allOrders",decodedToken.id)
      
     } catch (error) {
       console.error('Invalid token:', error);
     }
   }
 },[]);


 useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
    socket.on("receive",(data)=>{
      setCreatingOrder(false)
      setOrders(prev=>[data,...prev])
      console.log("order data",data)
    })

    socket.on("getOrders",(data)=>{
      setOrders(data)
      console.log("order data",data)
   })
   socket.on("Deleted",(data)=>{
        console.log(data)
        const rowElement = document.getElementById(`row-${data}`);
      if (rowElement) {
        rowElement.classList.add("fade-out");
        
        // Wait for the transition to complete before updating state
        setTimeout(() => {
        setOrders(prevOrders=>{

          // remove the deleted order from the orders array
          const orderReturned= prevOrders.filter(order=> order._id !==data )

          return orderReturned
         })
        },500)
      }
   })
   socket.on("orderDeleted",(data)=>{
    console.log(data)
    setOrders(prevOrders=>{

      // remove the deleted order from the orders array
      const orderReturned= prevOrders.filter(order=> order._id !==data )

      return orderReturned
     })
})
   
  socket.on("StatusUpdate",(data)=>{
    console.log(data)
    setOrders(prevOrders=>{

      const orderReturned = prevOrders.map(order => 
        order._id === data.order_id 
            ? { ...order, Status: data.status }  // Update the matching object
            : order                          // Keep other objects unchanged
    );
    
    return orderReturned;
     })
  })

    socket.on('disconnect',(reasons)=>{
        console.log(reasons)
      })
      
    
    return()=>{
        socket.off('connect');
        socket.off("Deleted")
        socket.off("orderDeleted")
        socket.off("StatusUpdate")
        socket.off("receive")
        socket.off("getOrders")
        socket.off('disconnect');
              
    }
},[socket,orders])



const [activeOrders, setActiveOrders]= useState([])
const [pendingOrders, setPendingOrders]= useState([])
useEffect(()=>{
   
     
        const activeOrder=orders.filter(order => order.Status==="in-transit")
        setActiveOrders(activeOrder)

        const pendingOrder=orders.filter(order => order.Status==="Pending...")
        setPendingOrders(pendingOrder)
   
},[activeOrders,pendingOrders])


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
    socket.emit("createOrder",{items,Id,...location,tracking_id: v4()})
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
        <div className='Orders_count'>
            <button>Active Orders {activeOrders.length}</button>
            <button>Pending Orders {pendingOrders.length}</button>
            <button>Total Orders {orders.length}</button>
        </div>


        <div>
        <div  style={{padding:"16px"}}>
              <form onSubmit={handleSubmit}>

                <div  style={{marginBlock:"16px"}}>
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
          <OrderTable orders={[...orders]} deleteOrder={deleteOrder} />
        </div>
    
  )
}

export default Orders