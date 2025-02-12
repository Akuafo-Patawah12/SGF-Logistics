import React,{useState} from 'react'
import "./TrackOrder&Map.css"
import { useNavigate } from "react-router-dom";

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
      alert("Please enter a tracking number.");
    }
  };

  return (
    <div className='Track_cont'>
    <div className="track_2">
        <p>TRACK YOUR SHIPMENTS</p>
        <p>Enter upto 10 digits of your tracking number</p>
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