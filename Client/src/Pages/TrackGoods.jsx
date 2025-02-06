import React,{useState} from 'react'
import "./TrackOrder&Map.css"

const TrackGoods = () => {

  const [trackingNumber, setTrackingNumber] = useState("");

  const handleChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleTrack = () => {
    if (trackingNumber.trim() !== "") {
      
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