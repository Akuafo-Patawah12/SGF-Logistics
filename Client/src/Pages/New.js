import React from "react";
import "./New.css";
import { ReactComponent as SvgIcon } from "../Icons/svgl_svg_format_2.svg"

const New = () => {
  const invoiceData = {
    invoiceNumber: "INV-2025001",
    date: "February 3, 2025",
    sender: {
      name: "SF Ghana Logistics",
      address: "123 Logistics Street, Accra, Ghana",
      phone: "+233 50 123 4567",
      email: "info@sfghanalogistics.com",
    },
    receiver: {
      invoice_date: "1st February",
      Loading_date: "456 Business Ave, Lagos, Nigeria",
      arrival_time: "2nd March 2025",
      Container: "99786gg",
    },
    shipmentDetails: [
      { description: "Electronics", cbm:34,ctn:31,tracking_no: 20977554, weight: "15kg", price: 150.0 },
      { description: "Furniture",cbm:74,ctn:43, tracking_no: 1867564, weight: "30kg", price: 250.0 },
    ],
    total: 400.0,
  };

  return (
    <div className="invoice-container">
    <SvgIcon/>
      <div className="invoice-header">
        <h2>Invoice</h2>
        <p>Invoice #: {invoiceData.invoiceNumber}</p>
        <p>Date: {invoiceData.date}</p>
      </div>

      <div className="invoice-section">
        <div className="invoice-details">
          <h3>Sender</h3>
          <p><strong>{invoiceData.sender.name}</strong></p>
          <p>{invoiceData.sender.address}</p>
          <p>Phone: {invoiceData.sender.phone}</p>
          <p>Email: {invoiceData.sender.email}</p>
        </div>

        <div className="invoice-details">
          
          <p>Invoice date<strong>{invoiceData.receiver.invoice_date}</strong></p>
          <p>Loading date: {invoiceData.receiver.Loading_date}</p>
          <p>Arrival time: {invoiceData.receiver.arrival_time}</p>
          <p>Container number: {invoiceData.receiver.Container}</p>
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
            {invoiceData.shipmentDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.tracking_no}</td>
                <td>{item.cbm}</td>
                <td>{item.ctn}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       
      <div className="invoice-footer">
        <h3>Total: ${invoiceData.total.toFixed(2)}</h3>
        
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
  );
};

export default New;
