import React,{useEffect, useState,useMemo} from 'react'
import io from "socket.io-client"
import {v4} from "uuid"
import { useNavigate } from 'react-router-dom'



import "./Orders.css"

import ButtonLoader from '../Icons/ButtonLoader'
import { PlusOutlined, SendOutlined } from '@ant-design/icons'
import PaymentPopUp from './Components/PaymentPopUp'


const Orders = () => {


  const socket = useMemo(() =>io("http://localhost:4040/orders",{
    transports: ["websocket","polling"],
    withCredentials: true,
  secure: true
  }),[])

const[orders,setOrders] =useState([])
const [creatingOrder,setCreatingOrder]= useState(false);

 


 useEffect(()=>{
    socket.on('connect',()=>{
        console.log("Connected to server")
        
    });
    socket.on("receive",(data)=>{
      setCreatingOrder(false)
      setOrders(prev=>[data,...prev])
      console.log("order data",data)
    })

    
   
   
  

    socket.on('disconnect',(reasons)=>{
        console.log(reasons)
      })
      
    
    return()=>{
        socket.off('connect');
        socket.off("receive")
        socket.off('disconnect');
              
    }
},[socket,orders])







    const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState([{ itemName: '', quantity: 1 }]);
const [orderInfo,setOrderInfo] = useState(
  {
    fullname:"",
    phone:"",
    email:"",
    additional_info:"",
    special_handling:"",
    shipnment_type:"",
    origin:"",
    destination:""
  }
)


const togglePopup = () => {
  setIsOpen(!isOpen);
};

const handleItemChange = (index, field, value) => {
  const newItems = [...items];
  newItems[index][field] = value;
  setItems(newItems);
};

const addItem = () => {
  setItems([...items, { itemName: '', quantity: 1 ,CBM:"",dimension:""}]);
};

const removeItem = (index) => {
  setItems(items.filter((_, i) => i !== index));
};

const handleSubmit = (e) => {
  e.preventDefault()
  setCreatingOrder(true)
  setTimeout(()=>{
    socket.emit("createOrder",{items,...orderInfo,tracking_id: v4()})
  },1000)
  
  // Reset form
  
  setItems([{itemName: '', quantity: 1 ,CBM:""}]);
  togglePopup();
};

function deleteOrder(order_id,customer_id){  //function to delete an order
 
    setTimeout(()=>{
      socket.emit("deleteOrder",{order_id,customer_id})
  
    },5000)
      
  }

  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(() => {
    // Generate a UUID as the invoice number when the component mounts
    const generatedInvoiceNumber = crypto.randomUUID().replace(/-/g, '').slice(0, 8);
    setInvoiceNumber(generatedInvoiceNumber);
  }, []);


  const [showPopup, setShowPopup] = useState(false);
  return (
    <div style={{marginTop:"90px"}}>
        <div className="background-image">
          <div className="image_cover"></div>
              <h4 className='quote_header'>REQUEST A QUOTE</h4>
        </div>
        


<div>
  
</div>

        <div>
        <div  style={{padding:"16px"}}>
              <form onSubmit={handleSubmit}>

                <div  style={{marginBlock:"16px"}}>
                  <p style={{marginBottom:"10px"}}>Contact Information</p>
                  <div className='contact_details'>
                  <input
                        className="contact_input"
                        type="text"
                        placeholder="Fullname"
                        onChange={(e)=>{setOrderInfo({...orderInfo,fullname:e.target.value})}}
                        
                        
                      />

                      <input
                        className="contact_input"
                        type="number"
                        onChange={(e)=>{setOrderInfo({...orderInfo,phone:e.target.value})}}
                        placeholder="Phone"
                        
                        
                      />

                  <input
                        className="contact_input"

                        
                        type="email"
                        onChange={(e)=>{setOrderInfo({...orderInfo,email:e.target.value})}}
                        placeholder="Email"
                        
                        
                      />
                  </div>

                  <div className='invoice_details' >
                  <div style={{marginLeft:"5%"}}>Invoice number</div>
                  <button style={{marginTop:"5px",width:"90%",paddingBlock:"5px",marginLeft:"5%"}}>#{invoiceNumber}</button>
                  </div>
                  <p style={{marginTop:"30px",borderBottom:"4px solid #eee",paddingBottom:"10px"}}>Shipments Details</p>
                  <section style={{border:"1px solid #ddd"}}>
                  <label  style={{display:"block", color:"#bbb",fontWeight:"600",marginBlock:"8px"}}>Items</label>
                  {items.map((item, index) => (
                    <div key={index}  style={{marginBlock:"8px",padding:"5px 10px",display:"flex",alignItems:"center",border:"1px solid #ddd",borderInline:"none"}}>
                      <input
                        className="input"

                        
                        type="text"
                        placeholder="Item name"
                        value={item.itemName}
                        onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      />
                      <input
                        className="input"
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      />

                      <input
                        className="input"

                        
                        type="text"
                        placeholder="CBM"
                        value={item.CBM}
                        onChange={(e) => handleItemChange(index, 'CBM', e.target.value)}
                      />
                      
                      <button
                        type="button"
                        style={{color:"red"}}
                        onClick={() => removeItem(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <section style={{display:"flex",padding:"0 2%",justifyContent:"space-between" ,width:"96%",}}>
                      <input type="text" 
                       className='input_location'
                       
                       name="location" 
                       id="origin" 
                       onChange={(e)=>{setOrderInfo({...orderInfo,origin:e.target.value})}}
                       placeholder='Origin'
                       
                       />

                      <input type="text" 
                      className='input_location'
                      
                      name="location" 
                      id="destination"
                      onChange={(e)=>{setOrderInfo({...orderInfo,destination:e.target.value})}}
                       placeholder='Destination'/>
                  </section>
                  
                  <button
                    type="button"
                    className="add_btn"
                    onClick={addItem}
                  >
                    <PlusOutlined />
                    Add Item
                  </button>
                  </section>
                </div>
                
                <section style={{border:"1px solid #ddd",padding:"10px 0",borderRadius:"5px",marginBottom:"20px"}}>
                  <div style={{borderBottom:"1px solid #ddd",marginBottom:"10px",paddingBottom:"5px",paddingLeft:"5px"}}>Special handling</div>
                  
                  <div  className='field'>
                  <div>
                  <label className="label">
                  <input type="checkbox" ></input>
                  Hazardious
                  </label>
                  </div>

                  
                  
                  <div>
                  <label className="label">
                  <input type="checkbox" ></input>
                  Temperature Sensity
                  </label>
                  </div>
                  
                  <div>
                  <label className="label">
                  <input type="checkbox" ></input>
                  Fragile
                  </label>
                  </div>
                  </div>
                </section>
                <div style={{display:"flex",flexDirection:"column"}}>
                  <textarea cols="30" rows="5"
                  onChange={(e)=>{setOrderInfo({...orderInfo,additional_info:e.target.value})}}
                  style={{maxWidth:"100%",background:"#eee",border:"1px solid #ddd",borderRadius:"5px",fontSize:"15px"}} placeholder="Add description about items here"></textarea>
                  <label className='shipment_note'>Please provide any additional information that may be helpful in providing an accurate quote.</label>
                </div>

                <div class="order_note">
            <h3>Note:</h3>
            <ol>
                <li>SFGL does NOT ship contraband goods. Your goods will be security checked...</li>
                <li>Our departure timelines are subject to cargo availability.</li>
                <li>Ship transit times may change without recourse to us.</li>
                <li>Cargo may require inspection by customs and other regulatory bodies at their instance and time.</li>
                <li>Our minimum CBM is 0.02. All items below 0.02CBM will be charged per our minimum CBM.</li>
                <li>Measurements will be re-taken at the warehouse in Ghana to confirm CBM before payments are made.</li>
                <li>Goods stored in our warehouse are subject to warehouse lien...</li>
                <li>After goods have arrived, leaving items at the warehouse for more than 4 days will incur a warehouse charge...</li>
                <li>Goods more than 300kg will be charged per ton and goods...</li>
                <li>Goods weighing more than 700kg is equivalent to 1 CBM.</li>
            </ol>
        </div>


                <div style={{display:"flex",border:"none",gap:"10px",justifyContent:"flex-end",marginTop:"20px"}} >
                  <button
                    type="button"
                    className="btn"
                    onClick={togglePopup}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => setShowPopup(true)}
                    className="animated-button"
                    
                    style={{display:"flex",gap:"5px",background:"#A7C756",border:"none",color:"white",paddingBlock:"8px",paddingInline:"16px",borderRadius:"10px"}}
            
                  >
                    Continue
                     <SendOutlined />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {creatingOrder && <div className='creating_order'>Creating Order... <ButtonLoader /></div> }
          <div>
      
      {showPopup && <PaymentPopUp onClose={() => setShowPopup(false)}  showPopup={showPopup}/>}
    </div>
         
        </div>
    
  )
}

export default Orders