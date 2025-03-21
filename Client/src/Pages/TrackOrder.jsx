import React,{useEffect,useMemo} from 'react'
import "../Styles/TrackOrder&Map.css"
import { Space, Button } from "antd"
import {Link } from 'react-router-dom'


const TrackOrder = () => {

 
 
  
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