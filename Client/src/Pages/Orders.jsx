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
  <div className="order">

    <h3 style={{marginBlock:"20px 10px"}}>Requst a free quote</h3>
   <div className='free_quote_input'>
      <input type="text"  placeholder='Shipping Mark' />
      <input type="text"  placeholder='Tracking Number'/>
      <input type='text'  placeholder='Email' />
      <input type="text"  placeholder='Date'/>
      <input type="text" placeholder='Telephone Number' />
      <input type="text" placeholder='Quantity' />
   </div>

      <div className="shipment_radio_checks">    
            <div>
              <div style={{fontWeight:"500",fontSize:"16px"}}>Types of Goods</div>
              <section   className="checks">
               <label><div className="input_container"> <input type='checkbox' /></div> Fragile</label>
               <label><div className="input_container"> <input type='checkbox' /></div> Normal goods </label>
                <label><div className="input_container"><input type='checkbox' /></div> Harzardous</label>
              </section>
            </div>

            <div>
              <div style={{fontWeight:"500",fontSize:"16px"}}>Shipping Origin</div>
              <section className="radios">
               <label> <div className="input_container"><input type='radio' name="Origin"/> </div> Guangzhou</label>
               <label> <div className="input_container"><input type='radio' name="Origin"/> </div>  Yiwu </label>
              </section>
            </div>


            

            
          </div>
              <textarea className="textArea" placeholder='Additional details: Any special requests or instructions'></textarea>
          </div>
    
  )
}

export default Orders