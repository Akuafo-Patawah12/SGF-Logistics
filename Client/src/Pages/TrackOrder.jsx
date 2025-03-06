import React,{useEffect,useMemo} from 'react'
import "../Styles/TrackOrder&Map.css"
import { Space, Button } from "antd"
import { useParams,Link } from 'react-router-dom'



import { transform } from 'framer-motion';
import { useNavigate} from "react-router-dom"
import io from "socket.io-client"

const TrackOrder = () => {


    const {id}= useParams()
    const navigate= useNavigate()

    const socket = useMemo(() =>io("http://localhost:4040/orders",{
      transports: ["websocket","polling"],
      withCredentials: true,
    secure: true
    }),[])
    
 useEffect(()=>{
  socket.on('connect',()=>{
      console.log("Connected to server")
      
  });
 

  socket.on('disconnect',(reasons)=>{
      console.log(reasons)
    })

    
    
  
  return()=>{
      socket.off('connect');
      socket.off('disconnect');
            
  }
},[socket])

   

    
 
  
  return (
    


      <div className='Track_cont3'>
      <div className="track_2">
          <p>TRACK YOUR SHIPMENTS</p>
          <Space size="middle">
        <Link to="/More/Track_order/Goods">
          <Button type="primary" size="large" style={{background:"var(--purple)"}}>Goods</Button>
        </Link>
        <Link to="/More/Track_order/Container">
          <Button type="default" size="large">Container</Button>
        </Link>
      </Space>
         
      </div>
      

      
        
      
    </div>
  )
}

export default TrackOrder