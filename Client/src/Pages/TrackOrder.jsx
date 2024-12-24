import React,{useEffect,useMemo} from 'react'
import "./TrackOrder&Map.css"
import {  RightCircleFilled } from '@ant-design/icons';
import  { useState } from "react";
import { useParams } from 'react-router-dom'
import LogisticFooter from '../Components/LogisticFooter';


import { transform } from 'framer-motion';
import { useNavigate} from "react-router-dom"
import io from "socket.io-client"

const TrackOrder = ({setPrompt,setTrackPop}) => {


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
    <div style={{marginTop:"90px"}}>


      <div className='Track_cont'>
      <div className="track_1">
          <p>TRACK YOUR SHIPMENTS</p>
          <section>
              <button onClick={()=> setTrackPop(true)}>Goods</button>
              <button>Container</button>
          </section>
          <button className="next">Next <RightCircleFilled style={{color:"#A7C756",position:"absolute",right:"5px"}}/></button>
      </div>
      </div>

      <div className='Track_cont'>
      <div className="track_2">
          <p>TRACK YOUR SHIPMENTS</p>
          <p>Enter upto 10 digits of your tracking number</p>
          <section>
              <button>Tracking Number</button>
              <button>Shipping Number</button>
          </section>
          <button className="track_btn">TRACK <RightCircleFilled style={{color:"#A7C756",position:"absolute",right:"5px"}}/> </button>
      </div>
      </div>
        
      <LogisticFooter />
    </div>
  )
}

export default TrackOrder