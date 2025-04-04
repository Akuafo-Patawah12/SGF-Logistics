import React,{useState} from 'react'
import "../Styles/TrackOrder&Map.css"
const TrackContainer = () => {
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
    <div className='Track_cont2'>
    <div className="track_2">
        <p>TRACK YOUR SHIPMENTS</p>
        
        <div className="tracking-container">
      <input
        type="text"
        placeholder="Enter container number..."
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

export default TrackContainer