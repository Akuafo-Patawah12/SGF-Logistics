import React, { useState, useEffect } from "react";

const Invoice = () => {
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");
    const [invoiceDueDate, setInvoiceDueDate] = useState("");
    const [items, setItems] = useState([
        { description: "", trackingNo: "", ctnNo: "", cbm: "", amount: "" }
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

    // Set the current date as Invoice Date and format it
    const setInvoice_date = () => {
        const today = new Date();
        setInvoiceDate(formatDateToDDMMYYYY(today));
        setInvoiceDueDate(formatDateToDDMMYYYY(new Date(today.setDate(today.getDate() + 3))));
    };

    // Handle adding a new row
    const addRow = () => {
        setItems([
            ...items,
            { description: "", trackingNo: "", ctnNo: "", cbm: "", amount: "" }
        ]);
    };

    // Handle deleting a row
    const deleteRow = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        calculateTotal(newItems);
    };

    // Calculate total amount
    const calculateTotal = (updatedItems) => {
        const total = updatedItems.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
        return total.toFixed(2);
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
            newItems[index].amount = (cbm * 230).toFixed(2);
        }

        setItems(newItems);
    };

    // Initialize on component mount
    useEffect(() => {
        generateInvoiceNumber();
        setInvoice_date();
    }, []);

    return (
        <div id="invoiceContent">
            <div className="watermark">SHUN FENG GHANA LOGISTICS LTD</div>
            <h2><strong>SHUN FENG GHANA LOGISTICS</strong></h2>
            <h5>0539480433 | 0208116360</h5>
            <h1>INVOICE</h1>

            <div className="invoice-header">
                <div>
                    <label><b>Invoice to:</b>
                        <input type="text" placeholder="Enter customer name" required />
                    </label>
                    <br /><br />
                    <label><b>Address:</b>
                        <input type="text" placeholder="City, Town" />
                    </label>
                    <br /><br />
                    <label><b>Mobile Number:</b>
                        <input type="text" placeholder="Enter phone number" required />
                    </label>
                </div>
                <div>
                    <strong>Invoice number: {invoiceNumber}</strong><br /><br />
                    <strong>Invoice Date: {invoiceDate}</strong><br /><br />
                    <strong>Invoice Due Date: {invoiceDueDate}</strong><br /><br />
                    <strong>Loading Date:
                        <input type="date" />
                    </strong><br /><br />
                    <strong>ETA:
                        <input type="date" />
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td><input type="text" name="description" value={item.description} onChange={(e) => handleInputChange(index, e)} /></td>
                            <td><input type="text" name="trackingNo" value={item.trackingNo} onChange={(e) => handleInputChange(index, e)} /></td>
                            <td><input type="text" name="ctnNo" value={item.ctnNo} onChange={(e) => handleInputChange(index, e)} /></td>
                            <td>
                                <button type="button" onClick={() => handleInputChange(index, { target: { name: "length", value: item.length } })}>Enter Dimensions</button>
                                <input type="text" name="cbm" value={item.cbm} onChange={(e) => handleInputChange(index, e)} />
                            </td>
                            <td><input type="text" name="amount" value={item.amount} onChange={(e) => handleInputChange(index, e)} /></td>
                            <td><button className="delete-button" onClick={() => deleteRow(index)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="totals-container">
                <p><strong>Total $:</strong> {calculateTotal(items)}</p>
            </div>

            <div className="note">
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

            <div className="bank-details">
                <h3>Bank Account details</h3>
                <strong>Bank:</strong> <b>STANBIC BANK</b><br /><br />
                <strong>Account Name:</strong> <b>SF GHANA LOGISTICS LTD</b><br /><br />
                <strong>Account Number:</strong> <b>9040012579394</b>
            </div>

            <div className="mobile-money">
                <h3>Mobile Money Details</h3>
                <strong>Mobile Number:</strong> <b>0559798238</b><br /><br />
                <strong>Merchant Name:</strong> <b>SF GHANA LOGISTICS LTD</b><br /><br />
                <strong>Mobile Network:</strong> <b>MTN</b>
            </div>

            <div className="button-container">
                <button onClick={addRow}><b>Add Row</b></button><br />
                <button onClick={() => window.print()}><b>Print Invoice</b></button><br />
                <button onClick={() => localStorage.setItem('totalAmount', calculateTotal(items))}><b>Pay Here</b></button><br />
            </div>
        </div>
    );
};

export default Invoice;
