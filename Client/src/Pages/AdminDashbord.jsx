import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./AdminDashboard.css"; // Import the CSS file

const socket = io("http://localhost:3001");

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [orders, setOrders] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });
  const [emailData, setEmailData] = useState({ to: "", subject: "", text: "" });
  const [shipmentData, setShipmentData] = useState({
    client: "",
    items: [],
    deliveryDate: "",
  });

  useEffect(() => {
    socket.emit("fetchOrders");

    socket.on("ordersList", (ordersList) => {
      setOrders(ordersList);
    });

    socket.on("orderAdded", (newOrder) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    });

    socket.on("shipmentCreated", (newShipment) => {
      setShipments((prevShipments) => [...prevShipments, newShipment]);
    });

    return () => {
      socket.off("ordersList");
      socket.off("orderAdded");
      socket.off("shipmentCreated");
    };
  }, []);

  const addAdmin = async () => {
    const response = await axios.post("http://localhost:3001/add-admin", newAdmin);
    if (response.data.success) {
      setAdmins((prevAdmins) => [...prevAdmins, response.data.newAdmin]);
      setNewAdmin({ name: "", email: "" });
    }
  };

  const createShipment = () => {
    socket.emit("createShipment", shipmentData);
    setShipmentData({ client: "", items: [], deliveryDate: "" });
  };

  const sendEmail = () => {
    socket.emit("sendEmail", emailData);
    setEmailData({ to: "", subject: "", text: "" });
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Add Admin Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Add Admin</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Name"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        />
        <button className="primary-button" onClick={addAdmin}>
          Add Admin
        </button>
      </section>

      {/* View Orders Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Orders</h2>
        <ul className="order-list">
          {orders.map((order) => (
            <li className="order-item" key={order.id}>
              {order.fullname}
            </li>
          ))}
        </ul>
      </section>

      {/* Create Shipment Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Create Shipment</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Client Name"
          value={shipmentData.client}
          onChange={(e) =>
            setShipmentData({ ...shipmentData, client: e.target.value })
          }
        />
        <input
          className="input-field"
          type="date"
          value={shipmentData.deliveryDate}
          onChange={(e) =>
            setShipmentData({ ...shipmentData, deliveryDate: e.target.value })
          }
        />
        <button className="primary-button" onClick={createShipment}>
          Create Shipment
        </button>
      </section>

      {/* Send Email Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Send Email</h2>
        <input
          className="input-field"
          type="email"
          placeholder="Recipient Email"
          value={emailData.to}
          onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Subject"
          value={emailData.subject}
          onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
        />
        <textarea
          className="textarea-field"
          placeholder="Message"
          value={emailData.text}
          onChange={(e) => setEmailData({ ...emailData, text: e.target.value })}
        />
        <button className="primary-button" onClick={sendEmail}>
          Send Email
        </button>
      </section>
    </div>
  );
};

export default AdminDashboard;

