import React,{useState} from 'react'
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

  return (
    <div className="popup-overlay">
    <div className="popup-content"  style={{animation:`${showPopup ? "0.5s showPop linear":""}`}}>
      <button className="close-btn" onClick={onClose}>X</button>
      <h2>Make a Payment</h2>
      <div className="tabs">
        <button
          className={activeTab === 'card' ? 'Active' : ''}
          onClick={() => handleTabChange('card')}
        >
          Debit Card
        </button>
        <button
          className={activeTab === 'momo' ? 'Active' : ''}
          onClick={() => handleTabChange('momo')}
        >
          Mobile Money
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {activeTab === 'card' && (
          <div className="form-section">
            <label>Card Number</label>
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
            <input type="text" className="payment_input" placeholder="Enter MoMo Number" required />

            <label>Network</label>
            <select required>
              <option value="mtn">MTN</option>
              <option value="vodafone">Vodafone</option>
              <option value="airtel">AirtelTigo</option>
            </select>
          </div>
        )}
        <button type="submit" className="pay-btn">Pay Now</button>
      </form>
    </div>
  </div>
  )
}

export default PaymentPopUp