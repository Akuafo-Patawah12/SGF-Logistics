import React, { useState } from 'react';

const Invoice = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceDueDate, setInvoiceDueDate] = useState('');
  const [loadingDate, setLoadingDate] = useState('');
  const [eta, setEta] = useState('');
  const [items, setItems] = useState([{ description: '', trackingNo: '', ctnNo: '', cbm: '', amount: '' }]);
  const [grandTotal, setGrandTotal] = useState(0);

  const addItem = () => {
    setItems([...items, { description: '', trackingNo: '', ctnNo: '', cbm: '', amount: '' }]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateTotal = () => {
    const total = items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
    setGrandTotal(total);
  };

  return (
    <div id="invoiceContent">
      <div className="watermark">SHUN FENG GHANA LOGISTICS LTD</div>
      <h2><strong>SHUN FENG GHANA LOGISTICS</strong></h2>
      <h5>0539480433 | 0208116360</h5>
      <h1>INVOICE</h1>

      <div className="invoice-header">
        <div>
          <label>
            <b>Invoice to:</b>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Enter customer name" required />
          </label>
          <label>
            <b>Address:</b>
            <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="City, Town" />
          </label>
          <label>
            <b>Mobile Number:</b>
            <input type="text" value={customerMobile} onChange={(e) => setCustomerMobile(e.target.value)} placeholder="Enter phone number" required />
          </label>
        </div>
        <div>
          <strong>Invoice number:
            <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} readOnly />
          </strong>
          <strong>Invoice Date:
            <input type="text" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
          </strong>
          <strong>Invoice Due Date:
            <input type="text" value={invoiceDueDate} onChange={(e) => setInvoiceDueDate(e.target.value)} />
          </strong>
          <strong>Loading Date:
            <input type="date" value={loadingDate} onChange={(e) => setLoadingDate(e.target.value)} />
          </strong>
          <strong>ETA:
            <input type="date" value={eta} onChange={(e) => setEta(e.target.value)} />
          </strong>
        </div>
      </div>

      <div className="invoice-details">
        <strong>RATE:</strong> USD / CBM
      </div>

      <table className="details-table">
        <thead>
          <tr>
            <th>DESCRIPTION</th>
            <th>TRACKING NO.</th>
            <th>CTN NO.</th>
            <th>CBM</th>
            <th>Amount $</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td><input type="text" value={item.description} onChange={(e) => handleInputChange(index, 'description', e.target.value)} /></td>
              <td><input type="text" value={item.trackingNo} onChange={(e) => handleInputChange(index, 'trackingNo', e.target.value)} /></td>
              <td><input type="text" value={item.ctnNo} onChange={(e) => handleInputChange(index, 'ctnNo', e.target.value)} /></td>
              <td><input type="text" value={item.cbm} onChange={(e) => handleInputChange(index, 'cbm', e.target.value)} /></td>
              <td><input type="text" value={item.amount} onChange={(e) => handleInputChange(index, 'amount', e.target.value)} /></td>
              <td><button onClick={() => deleteItem(index)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totals-container">
        <p><strong>Total $:</strong> <input type="text" value={grandTotal} readOnly /></p>
      </div>

      {/* Additional information sections like Bank details, Notes, etc., go here */}
      
      <div className="button-container">
        <button onClick={addItem}><b>Add Row</b></button>
        <button onClick={() => window.print()}><b>Print Invoice</b></button>
        {/* Add other button actions as needed */}
      </div>
    </div>
  );
};

export default Invoice;
