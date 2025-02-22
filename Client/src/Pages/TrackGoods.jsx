import React,{useState} from 'react'
import "./TrackOrder&Map.css"
import { useNavigate } from "react-router-dom";
import { message } from "antd"

const TrackGoods = () => {
  
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate= useNavigate()

  const handleChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleTrack = () => {
    if (trackingNumber.trim() !== "") {
      
      navigate(`/More/Map?tracking_id=${trackingNumber}`);

     
    } else {
      message.error("Please enter a tracking number.");
    }
  };

  return (
    <div className='Track_cont1'>
    <div className="track_2">
        <p style={{color:"black",fontSize:"30px"}}>TRACK YOUR SHIPMENTS</p>
        <p style={{color:"black" ,fontSize:"20px",fontWeight:"500"}}>Enter upto 10 digits of your tracking number</p>
        <div className="tracking-container">
      <input
        type="text"
        placeholder="Enter tracking number..."
        value={trackingNumber}
        onChange={handleChange}
        className="tracking-input"
      />
      <button onClick={handleTrack} className="track-button">
        Track
      </button>
    </div>
       
    </div>
    </div>
  )
}

export default TrackGoods