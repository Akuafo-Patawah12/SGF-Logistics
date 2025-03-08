import React ,{useState,useEffect,useMemo} from "react";
import "../Styles/Invoice.css";
import { Button,message } from "antd"
import { CloseOutlined } from "@ant-design/icons";

import { ReactComponent as SvgIcon } from "../Icons/svgl_svg_format_2.svg"

const New = ({invoiceData,generateAndSendPDFs,divRef}) => {
  


  const [invoiceNumber,setInvoiceNumber] = useState("")
  const [invoiceDate, setInvoiceDate ] = useState("")
  const [ invoiceInfo , setInvoiceInfo]= useState({})

  



  

  const formatDateToDDMMYYYY = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; // Months are zero-based
    const yyyy = date.getFullYear();

    // Ensure two digits for day and month
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${dd}/${mm}/${yyyy}`;
};

  useEffect(()=>{
    const generateInvoiceNumber = () => {
      const today = new Date();
      setInvoiceDate(formatDateToDDMMYYYY(today));
      const invNumber = 'INV-' + Math.floor(100000 + Math.random() * 900000);
      setInvoiceNumber(invNumber);
  };
  generateInvoiceNumber()
  },[])
  

  const invoiceData1 = {
    invoiceNumber: `${invoiceNumber}`,
    
    sender: {
      name: "Shun Feng Ghana Logistics",
      address: "George Bush Highway, Dzorwulu,Accra-Ghana",
      phone: "053 948 0433",
      email: "sfghanalogistics24@gmail.com",
    },
    receiver: {
      shippingMark: invoiceData?.shippingMark || "N/A",
      invoice_date: invoiceDate,
      Loading_date: invoiceData?.loadingDate,
      cbmRate: invoiceData?.cbmRate ,
      arrival_time: invoiceData?.eta || "N/A",
      Container: invoiceData?.containerNumber  || "N/A",
    },
    
  };

  return (
    <div className="Invoice">
   
    
  <div ref={divRef} className="invoice-container">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> <SvgIcon style={{transform:"translateX(0px)"}}/>  <span style={{color:"red",fontWeight:"500"}}>PROVISIONAL INVOICE </span></div>
      <div className="invoice-header">
        
        <p>Invoice #: {invoiceData1.invoiceNumber}</p>
        
      </div>

      <div className="invoice-section">
        <div className="invoice-details">
          
          <p><strong>{invoiceData1.sender.name}</strong></p>
          <p>{invoiceData1.sender.address}</p>
          <p>Phone: {invoiceData1.sender.phone}</p>
          <p>Email: sfghanalogistics24@gmail.com</p>
        </div>
        
        <div className="invoice-details">
        <p>Invoice to: <span style={{transform:"translateX(10px)"}}>{invoiceData1.receiver.shippingMark}</span></p>
          <p>Invoice date: <span style={{transform:"translateX(10px)"}}>{invoiceData1.receiver.invoice_date}</span></p>
          <p>Loading date: <span style={{transform:"translateX(10px)"}}>{new Date(invoiceData1.receiver.Loading_date).toLocaleDateString()}</span></p>
          <p>CBM Rate: <span style={{transform:"translateX(10px)"}}>{invoiceData1.receiver.cbmRate}</span></p>
          <p>Arrival time: <span style={{transform:"translateX(10px)"}}>{new Date(invoiceData1.receiver.arrival_time).toLocaleDateString()}</span></p>
          <p>Container number: <span style={{transform:"translateX(10px)"}}>{invoiceData1.receiver.Container}</span></p>
        </div>
      </div>

      <div className="invoice-table">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Tracking No.</th>
              <th>CBM</th>
              <th>CTN</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            
              <tr>
                <td>{invoiceData?.description || "unclassified"}</td>
                <td>{invoiceData?.trackingNo }</td>
                <td>{invoiceData?.cbm }</td>
                <td>{invoiceData?.ctn}</td>
                <td>${invoiceData?.amount}</td>
              </tr>
            
          </tbody>
        </table>
      </div>
       
      <div className="invoice-footer">
        <h3>Total: ${invoiceData?.amount}</h3>
        
      </div>
      <div className="information">
      <div className="Notice">
        <h3>Note</h3>
        <ol className="list">
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
      <div >
        <section className="bank_account">
            <h3>CEDIS ACCOUNT DETAILS</h3>
            <div className="account_info">
                <span>BANK:</span>
                <span>STANBIC BANK</span>
            </div>
            <div className="account_info">
                <span>ACCOUNT NUMBER:</span>
                <span>9040012579394</span>
            </div>
            <div className="account_info">
                <span>ACCOUNT NAME:</span>
                <span>SF GHANA LOGISTICS LTD</span>
            </div>
        </section>
        <section className="mobile_money">
        <h3>MOBILE MONEY DETAILS</h3>
            <div className="account_info">
                <span>MOBILE NUMBER</span>
                <span>0559798238</span>
            </div>
            <div className="account_info">
                <span>MERCHANT NAME:</span>
                <span>SF GHANA LOGISTICS LTD</span>
            </div>
            <div className="account_info">
                <span>MOBILE NETWORK:</span>
                <span>MTN</span>
            </div>
        </section>
        </div>
      </div>
    </div>   
    

   
    </div>
  );
};

export default New;
