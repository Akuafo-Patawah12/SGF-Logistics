// Frontend - React with CSS
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './AdminDashboard.css'
import axios from "axios"
const socket = io('http://localhost:4040');

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [shipment, setShipment] = useState({ route: 'A', tracking: '', status: 'Pending' });

  
  const [formData, setFormData] = useState({
    trackingNumber: '',
    origin: '',
    destination: '',
    status: 'Pending',
  });

  // Fetch all shipments on component mount
  

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/shipments/create', formData);
      alert('Shipment created successfully!');
      setFormData({ trackingNumber: '', origin: '', destination: '', status: 'Pending' });
      fetchShipments(); // Refresh the list
    } catch (error) {
      console.error('Error creating shipment:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`/api/shipments/${id}`, { status });
      alert('Shipment status updated successfully!');
      fetchShipments(); // Refresh the list
    } catch (error) {
      console.error('Error updating shipment status:', error);
    }
  };


  useEffect(() => {
    socket.emit('get_shipment');

    socket.on('shipmentData', (data) => {
      setShipments(data);
    });

    socket.on('new-shipment', (data) => {
      setShipments((prev) => [...prev, data]);
    });

    socket.on('update-shipment', (data) => {
      setShipments((prev) => prev.map((s) => (s._id === data._id ? data : s)));
    });

    socket.on('delete-shipment', (id) => {
      setShipments((prev) => prev.filter((s) => s._id !== id));
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchShipments = async () => {
    const response = await fetch('http://localhost:5000/shipments');
    const data = await response.json();
    setShipments(data);
  };

  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/add-admin', newAdmin, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Admin added successfully');
      setNewAdmin({ username: '', password: '' });
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleCreateShipment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/shipments', {
        shipmentIds: selectedShipments,

      });
      console.log('Shipment created:', response.data);
      // Clear selected shipments after creation
      setSelectedShipments([]);
    } catch (error) {
      console.error('Error creating shipment:', error);
    }
  
  };

  const handleUpdateShipment = async (id, status) => {
    await fetch(`http://localhost:5000/update-shipment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  };

  const handleDeleteShipment = async (id) => {
    await fetch(`http://localhost:5000/delete-shipment/${id}`, {
      method: 'DELETE'
    });
  };

  const [selectedShipments, setSelectedShipments] = useState([]);

  const handleSelectShipment = (id) => {
    setSelectedShipments((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((shipmentId) => shipmentId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <section className="add-admin">
        <h2>Add Admin</h2>
        <input
          type="text"
          placeholder="Username"
          value={newAdmin.username}
          onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
        />
        <button onClick={handleAddAdmin}>Add Admin</button>
      </section>

      <section className="create-shipment">
        <h2>Create Shipment</h2>
        <select
          value={shipment.route}
          onChange={(e) => setShipment({ ...shipment, route: e.target.value })}
        >
          {[...Array(7)].map((_, i) => (
            <option key={i} value={String.fromCharCode(65 + i)}>
              Route {String.fromCharCode(65 + i)}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Tracking"
          value={shipment.tracking}
          onChange={(e) => setShipment({ ...shipment, tracking: e.target.value })}
        />
        
      </section>

      <section className="shipments-list">
        <h2>Shipments</h2>
        <table>
          <thead>
            <tr>
              <th>Route</th>
              <th>Tracking</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments?.map((shipment) => (
              <tr key={shipment?._id}>
              <td>
            <input
              type="checkbox"
              checked={selectedShipments.includes(shipment?._id)}
              onChange={() => handleSelectShipment(shipment?._id)}
            />
          </td>
                <td>{shipment?.route}</td>
                <td>{shipment?.tracking}</td>
                <td>{shipment?.status}</td>
                <td>
                  <select
                    value={shipment?.status}
                    onChange={(e) => handleUpdateShipment(shipment?._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button onClick={() => handleDeleteShipment(shipment._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleCreateShipment}>Create Shipment for Selected Orders</button>
      </section>

      <section className="users-list">
        <h2>All Users</h2>
        <ul>
          {users?.map((user) => (
            <li key={user?._id}>{user?.username}</li>
          ))}
        </ul>
      </section>

     
  
  
    <div>
      <h1>Shipment Management</h1>

      {/* Create Shipment Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tracking Number:</label>
          <input
            type="text"
            name="trackingNumber"
            value={formData.trackingNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Origin:</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <button type="submit">Create Shipment</button>
      </form>

      {/* Shipments Table */}
      <h2>All Shipments</h2>
      <table>
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment._id}>
              <td>{shipment.trackingNumber}</td>
              <td>{shipment.origin}</td>
              <td>{shipment.destination}</td>
              <td>{shipment.status}</td>
              <td>
                <button onClick={() => handleUpdateStatus(shipment._id, 'In Transit')}>
                  Mark as In Transit
                </button>
                <button onClick={() => handleUpdateStatus(shipment._id, 'Delivered')}>
                  Mark as Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 
    </div>
  );
};


export default AdminDashboard;
