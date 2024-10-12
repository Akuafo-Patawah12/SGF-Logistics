import React,{useState,useMemo,useEffect} from 'react'
import {Link} from "react-router-dom"
import "./AdminDashboard.css"
import {DeleteOutlined, MessageOutlined,CopyOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'  
import {jwtDecode} from "jwt-decode"

import io from "socket.io-client"

const AdminDashboard = () => {

    const accesstoken=localStorage.getItem("accesstoken")
    const decode=jwtDecode(accesstoken)
  const socket = useMemo(() =>io("http://localhost:4040/admin",{
    transports: ["websocket","polling"],
    withCredentials: true,
  secure: true
  }),[])
  
  const navigate= useNavigate()
 const[orders,setOrders]=useState([])


  useEffect(()=>{
    socket.emit("joinRoom",{id:decode.id})
  },[])

  useEffect(()=>{
     socket.emit("clientOrders")
  },[])
  

    const[hasFetched,setHasFetched]= useState(false)
 
  useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
    
   socket.on("joined",(data)=>{
       console.log(data)
   }) 
   socket.on("getAllOrders",async(data)=>{
        setOrders(data)
   })
    socket.on('receivedOrder',(data)=>{
      console.log(data)
      setOrders(prev => [data,...prev])
      console.log("order data",data)
    })

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    
    socket.on("orderDeleted",(data)=>{
      const rowElement = document.getElementById(`row-${data}`);
      if (rowElement) {
        rowElement.classList.add("fade-out");

         // Wait for the transition to complete before updating state
         setTimeout(() => {
      setOrders(prevOrders=>{
         const updatedOrders = prevOrders.filter(order => order._id !== data);
        
         // Return the updated array
         return updatedOrders;
     })
    }, 500); // Ensure it matches CSS transition duration
    }
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
      }, 500); // Ensure it matches CSS transition duration
    }
       
 })
    socket.on("SendShippment",(data)=>{
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


    socket.on("joined",(data)=>{
       console.log(data)
    })
    socket.on('disconnect',(reasons)=>{
        console.log(reasons)
      })
     
    
    return()=>{
        socket.off('connect');
        socket.off("receivedOrder")
        socket.off("orderDeleted")
        socket.off("SendShippment")
        socket.off('disconnect');
        socket.off("connect_error")
        socket.off("getAllOrders")  
        socket.off("joined")  
    }
},[navigate])

const[checked,setChecked]= useState([
  {id:""}
])




function deleteOrder(order_id,customer_id){  //function to delete an order
    socket.emit("deleteOrder",{order_id,customer_id})  
}

    
    function copy(id){
      navigator.clipboard.writeText(id)
    }

const style={color:" #57534e", fontSize: "0.875rem", lineHeight: "1.25rem",border:"2px solid  #e7e5e4",paddingBock:"10px"}
  return (
    <div
    
    className='w-full bg-stone-100 pt-24 lg:w-[80%] ml-auto'
    >
      
      <button className="ml-[5%] font-medium">#Orders</button>
     
     <div className='rounded-xl border-[1px] border-stone-300 py-5 w-[95%] ml-auto mt-3'>
     <table className="w-[95%] bg-white mt-3  overflow-hidden rounded-2xl">
        <thead>  {/*Table head */}
            <tr className='bg-stone-300 h-[40px] rounded-2xl'>
                <th><input type="checkbox" ></input></th>
                <th style={style}>#Order ID</th>
                <th style={style}>#Client</th>
                <th style={style}>Product</th>
                <th style={style}>Quantity</th>
                <th style={style}>Status</th>
                <th style={style}>Arrival time</th>
            </tr>
        </thead>
        <tbody className="transition-all">
            {orders.map((order,index)=>(
              <tr key={order._id} id={`row-${order._id}`} style={{borderBottom:"1px solid #ddd",height:"35px",position:"relative"}}>
                <td style={{display:"flex",justifyContent:"center",alignAlign:"center"}}>
                  <input 
                   type="checkbox"
                   value={checked}
                   onCheck={()=>{setChecked(order._id)}}
                   className='my-auto'
                   ></input>
                  </td>
                <td style={{cursor:"pointer",scrollbarWidth:"none",overflowX:"auto",maxWidth:"80px",fontSize: '15px', color:"#57534e"}}>
                <Link to={`/Orders/View_Order/${order.customer_id}`}>{order._id}</Link> {/* Adding the customer id into the URL*/}<span onClick={()=>copy(order._id)}  style={{position:"absolute",color:"#fff",left:"20%",zIndex:"1",top:"4px"}} ><CopyOutlined /></span>
                </td>
                <td style={{paddingLeft:"8px",color:"#aaa"}} >{order.customerName} </td>
                <td></td>
                <td onClick={() => deleteOrder(order._id,order.customer_id)}><span style={{position:"absolute",right:"8px",top:"8px"}}><DeleteOutlined /></span> </td>
                
                <td style={{fontSize: '15px',color:"#57534e"}}>
                  {order.Status}  
                </td> 
                <td></td>
            </tr>
            ))}
        </tbody>
    </table>
 
    </div>
    </div>
  )
}

export default AdminDashboard