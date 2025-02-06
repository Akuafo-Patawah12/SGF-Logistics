import React,{useEffect,useMemo} from 'react'
import "./TrackOrder&Map.css"

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
    


      <div className='Track_cont'>
      <div className="track_1">
          <p>TRACK YOUR SHIPMENTS</p>
          <section>
              <Link to={"/More/Track_order/Goods"}><button >Goods</button></Link>
              <Link to={"/More/Track_order/Container"}><button>Container</button></Link>
          </section>
         
      </div>
      

      
        
      
    </div>
  )
}

export default TrackOrder