import React,{useEffect, useState,useMemo} from 'react'
import LogisticFooter from "../Components/LogisticFooter"
import io from "socket.io-client"
import {v4} from "uuid"
import { useNavigate,Link } from 'react-router-dom'
// Add this to your entry point, e.g., index.js or App.js





import "./Orders.css"

import ButtonLoader from '../Icons/ButtonLoader'
import { PlusOutlined, SendOutlined } from '@ant-design/icons'
import PaymentPopUp from './Components/PaymentPopUp'





const Orders = () => {
  const navigate= useNavigate()


  const socket = useMemo(() =>io("https://sgf-logistics-1.onrender.com/orders",{
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



const addItem = () => {
  setItems([...items, {  description: "", trackingNo: "", ctnNo: "", cbm: "", amount: "" }]);
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
  
  setItems([{ description: "", trackingNo: "", ctnNo: "", cbm: "", amount: "" }]);
  togglePopup();
};

function deleteOrder(order_id,customer_id){  //function to delete an order
 
    setTimeout(()=>{
      socket.emit("deleteOrder",{order_id,customer_id})
  
    },5000)
      
  }



  

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  

  const[total,setTotal] =useState(0)
  
  const [items, setItems] = useState([
      { description: "", trackingNo: "", ctnNo: "", cbm: "", Amount: "",length:"",width:"",height:"" }
  ]);

  // Generate a random invoice number
  const generateInvoiceNumber = () => {
      const invNumber = 'INV-' + Math.floor(100000 + Math.random() * 900000);
      setInvoiceNumber(invNumber);
  };

  // Format the date to dd/mm/yyyy
  const formatDateToDDMMYYYY = (date) => {
      let dd = date.getDate();
      let mm = date.getMonth() + 1; // Months are zero-based
      const yyyy = date.getFullYear();

      // Ensure two digits for day and month
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      return `${dd}/${mm}/${yyyy}`;
  };

  useEffect(() => {
    const newTotal = items.reduce((sum, row) => {
      const amount = parseFloat(row.Amount) || 0;
      return sum + amount;
    }, 0);
    setTotal(newTotal.toFixed(2));
  }, [items]); // Only rerun when items change

  function calculateCBM(index) {
    // Create a new array to avoid mutating the state directly
    const newItems = [...items];
    
    // Calculate CBM based on dimensions
    const cbm = items[index].length * items[index].width * items[index].height;
    newItems[index]["cbm"] = cbm.toFixed(3);

    // Calculate the amount based on CBM
    const amount = cbm * 230;
    newItems[index]["Amount"] = amount.toFixed(2);

    // Update the items state, which will trigger the effect to recalculate the total
    setItems(newItems);
    setActiveIndex(activeIndex === index ? null : index);

  }

  

  // Set the current date as Invoice Date and format it
  const setInvoice_date = () => {
      const today = new Date();
      setInvoiceDate(formatDateToDDMMYYYY(today));
      setInvoiceDueDate(formatDateToDDMMYYYY(new Date(today.setDate(today.getDate() + 3))));
  };


 

  // Handle input changes for item rows
  const handleInputChange = (index, event) => {
      const { name, value } = event.target;
      const newItems = [...items];
      newItems[index][name] = value;

      if (name === "length" || name === "width" || name === "height") {
          const length = parseFloat(newItems[index].length || 0);
          const width = parseFloat(newItems[index].width || 0);
          const height = parseFloat(newItems[index].height || 0);
          const cbm = (length * width * height).toFixed(3);
          newItems[index].cbm = cbm;

          // Calculate amount (example rate: $230 per CBM)
          newItems[index].Amount = (cbm * 230).toFixed(2);
      }

      setItems(newItems);
  };

  // Initialize on component mount
  useEffect(() => {
      generateInvoiceNumber();
      setInvoice_date();
  }, []);


  const [showPopup, setShowPopup] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDimensions = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle visibility
  };
  

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
        {process.env.REACT_APP_MAPBOX_TOKEN}
              <form onSubmit={handleSubmit}>
              

                <div  style={{marginBlock:"16px"}}>
                  <p style={{marginBottom:"10px"}}>Contact Information</p>
                  <div className="one">
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
                  
                  <button>Invoice<br/> number <br/>{invoiceNumber} <div className="wear-off wear_1"></div></button>
                  <button>Invoice Date: {invoiceDate}</button>
                  <button>Invoice Due Date: {invoiceDueDate} <div className="wear-off wear_2"></div></button>
                  </div>
                  </div>

                  
                  <p style={{marginTop:"30px",paddingBottom:"10px"}}>Shipments Details</p>
                  <section style={{border:"1px solid #ddd"}} className='hero'>
    <table className="details-table">
  <thead>
    <tr>
      <th>DESCRIPTION</th>
      <th>TRACKING NO.</th>
      <th>CTN NO.</th>
      <th>CBM</th>
      <th>Amount $</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item, index) => (
      <tr key={index} className="table-row">
        <td>
          <input
            type="text"
            name="description"
            value={item.description}
            onChange={(e) => handleInputChange(index, e)}
          />
        </td>
        <td>
          <input
            type="text"
            name="trackingNo"
            value={item.trackingNo}
            onChange={(e) => handleInputChange(index, e)}
          />
        </td>
        <td>
          <input
            type="text"
            name="ctnNo"
            value={item.ctnNo}
            onChange={(e) => handleInputChange(index, e)}
          />
        </td>
        <td style={{display:"flex",minWidth:"100px"}}>
          <input
            type="text"
            name="cbm"
            placeholder="Dimension"
            value={item.cbm}
            onChange={(e) => handleInputChange(index, e)}
            disabled={true}
          />
          <button>Add</button>
        </td>
        <td>
          <input
            type="text"
            name="amount"
            value={item.Amount}
            onChange={(e) => handleInputChange(index, e)}
            disabled={true}
          />
        </td>
        <td>
          <button
            type="button"
            className="remove-item-button"
            onClick={() => removeItem(index)}
          >
            &times;
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


{items.map((item, index) => (
  <div key={index} className="table">
  
  <section>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleInputChange(index, e)}
          />
        </section>
        <section>
          <input
            type="text"
            name="trackingNo"
            placeholder='Tracking No.'
            value={item.trackingNo}
            onChange={(e) => handleInputChange(index, e)}
          />
        </section>
        <section>
          <input
            type="text"
            name="ctnNo"
            placeholder="Ctn No."
            value={item.ctnNo}
            onChange={(e) => handleInputChange(index, e)}
          />
        </section>
        <section>
          <input
            type="text"
            name="cbm"
            placeholder="CBM"
            value={item.cbm}
            disabled={true}
            style={{cursor:"not-allowed"}}
            onChange={(e) => handleInputChange(index, e)}
          />
          <button className="dimensions" type="button" onClick={() => toggleDimensions(index)} >Add dimensions</button>
        </section>
        <section>
          <input
            type="text"
            name="amount"
            placeholder="Amount $"
            value={item.Amount}
            style={{cursor:"not-allowed"}}
            onChange={(e) => handleInputChange(index, e)}
            disabled={true}
          />
        </section>
        {activeIndex === index && (<div className='dimen-container'>
        
        <div className="dimen">
        <div className="dimen-index">{index+1}</div>
        <button type="button" onClick={()=> toggleDimensions(index)} className='close-dimen'>X</button>
          <input type='number' placeholder='Width'
            name="width"
            value={item.width}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input type='number' placeholder='Height'
            name="height"
            value={item.height}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input type='number' placeholder='Length'
            name="length"
            value={item.length}
            onChange={(e) => handleInputChange(index, e)}
          />

          <button type="button" onClick={()=> calculateCBM(index)}>Add</button>
        </div>
        </div>)}


        <section>
          <button
            type="button"
            className="remove-item-button"
            onClick={() => removeItem(index)}
          >
            &times;
          </button>
        </section>
        <div className='table-index'>{index + 1}</div>
  </div>
))}
                 
<div className="total">
  <section>Total</section>
  <section>${total}</section>
</div>   
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
                
                
            

            <div class="order_note">
            <h3>Note:</h3>
            <ol>
                <li>SFGL does not ship contraband goods. Your goods will be security checked.</li>
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


                <div className="payment_btn" style={{display:"flex",border:"none",gap:"10px",justifyContent:"flex-end",marginTop:"20px"}} >
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
                    Make Payment
                  </button>
                  <Link to={"/AllOrders"}><button className="view">View Orders</button></Link>
                </div>
              </form>
            </div>
          </div>

          {creatingOrder && <div className='creating_order'>Creating Order... <ButtonLoader /></div> }
          <div>
      
      {showPopup && <PaymentPopUp onClose={() => setShowPopup(false)}  showPopup={showPopup}/>}
    </div>
         


           <LogisticFooter />
        </div>
    
  )
}

export default Orders