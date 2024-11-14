import React,{useState} from 'react'
import {ReactComponent as MasterIcon} from "../../Icons/mastercard.svg"
import {ReactComponent as DebitIcon} from "../../Icons/DebitCard.svg"
import {ReactComponent as Momo} from "../../Icons/momo.svg"
import "./Payment.css"

const PaymentPopUp = ({ onClose,showPopup }) => {

     const [activeTab, setActiveTab] = useState('card');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing logic here
    alert(`Payment made using ${activeTab}`);
  };

  const [serviceProvider, setServiceProvider] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const detectProvider = (number) => {
    const prefix = number.slice(0, 3);
    const providers = {
      "024": "MTN", "054": "MTN", "053": "MTN", "059": "MTN", "025": "MTN", "055": "MTN",
      "026": "Airtel/Tigo", "027": "Airtel/Tigo", "057": "Airtel/Tigo", "056": "Airtel/Tigo",
      "020": "Telecel", "050": "Telecel"
    };
    setServiceProvider(providers[prefix] || "");
  };

  return (
    <div className="popup-overlay">
    <div className="popup-content"  style={{animation:`${showPopup ? "0.5s showPop linear":""}`}}>
      <button className="close-btn" onClick={onClose}>X</button>
      <h2>Select Payment Method</h2>
      <div className="tabs">
        <button
          className={activeTab === 'card' ? 'Active' : ''}
          onClick={() => handleTabChange('card')}
        >
          
          Debit Card
          <DebitIcon />
        </button>
        <button
          className={activeTab === 'momo' ? 'Active' : ''}
          onClick={() => handleTabChange('momo')}
        >
        
          Mobile Money
          <Momo/>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {activeTab === 'card' && (
          <div className="form-section">
            <label style={{position:"relative"}}>Card Number  <span style={{position:"absolute",bottom:"-45px",right:"0"}}><MasterIcon /></span></label>
            <input type="text" className="payment_input" placeholder="1234 5678 9101 1121" required />

            <label>Expiry Date</label>
            <input type="text" className="payment_input" placeholder="MM/YY" required />

            <label>CVV</label>
            <input type="text" className="payment_input" placeholder="123" required />
          </div>
        )}
        {activeTab === 'momo' && (
          <div className="form-section">
            <label>Mobile Money Number</label>
            <input type="text" 
            className="payment_input" 
            value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                detectProvider(e.target.value);
              }}
            placeholder="Enter MoMo Number" required />

            <label>Service Provider</label>
            <div>
            
            <div style={{width:"95%",border:"1px solid #ddd",padding:"8px 1.8%"}}>{ mobileNumber===""? "Choose network": serviceProvider}</div>
          </div>
          </div>
        )}
        <button type="submit" className="pay-btn">Pay Now</button>
      </form>
    </div>
  </div>
  )
}

export default PaymentPopUp