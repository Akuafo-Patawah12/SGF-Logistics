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

  const [cardNumber, setCardNumber] = useState('');
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Allow only numeric characters

    // Insert a space after every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    if (value.length <= 19) { // Max length: 16 digits + 3 spaces
      setCardNumber(value);
    }
  };

  const [cvv, setCvv] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;

    // Allow only numeric values and limit the length to 3
    if (/^\d{0,3}$/.test(value)) {
      setCvv(value);
    }
  };


const [expiryDate, setExpiryDate] = useState('');
const ChangeExpiry = (e) => {
let value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters


// Format as MM/YY using regex

value = value.replace(/^(\d{2})(\d{0,2})$/, (_, month, year) => {
  if (value.length > 1) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`; // Insert '/' after the second digit
  }
  if (parseInt(month, 10) > 12 || parseInt(month, 10) < 1) return ''; // Validate month
  return year ? `${month}/${year}` : `${month}`;
});

if (value.length <= 5) {
  setExpiryDate(value); // Update state
}
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
            <input type="text" className="payment_input"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              placeholder="1234 5678 9101 1121" required />
              
             <div style={{display:"flex",width:"97%",gap:"20px"}}>

             <div>
            <label>Expiry Date</label>

            <input type="text" className="payment_input"
              value={expiryDate}
              onChange={ChangeExpiry}
              maxLength={5} 
              placeholder="MM/YY" required />
             

              </div>
            
              <div>
            <label>CVV</label>
            <input type="text" className="payment_input"
               value={cvv}
               onChange={handleChange}
               maxLength={3}
               placeholder="123" required />
            </div>
            </div>
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