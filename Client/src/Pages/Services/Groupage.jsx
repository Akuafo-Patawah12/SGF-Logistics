import React from 'react';
import { Link } from "react-router-dom";
import { ShopOutlined, SmileOutlined } from '@ant-design/icons';
import "./SubPages.css";


const Groupage = () => {
  return (
    <div className="groupage-container">
      {/* Header Section */}
      <div className='header-banner'>
        <div className="header-overlay">
          <h1 className="header-title">Groupage Services</h1>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link> /
        <Link to="/Services"> Services</Link> /
        <span> Groupage</span>
      </nav>

      {/* Content Section */}
      <section className="content">
        <div className="text-section">
          <h2>What is Groupage?</h2>
          <p>
            Our Groupage Services allow businesses with small to medium-sized shipments to save on costs
            by sharing container space with others. Perfect for clients who do not require an entire container
            but need reliable delivery.
          </p>
        </div>

        <div className="text-section benefits">
          <h2>Key Benefits</h2>
          <ul>
            <li><strong>Cost-Effective:</strong> Reduce costs by sharing container space.</li>
            <li><strong>Flexible Scheduling:</strong> Regular shipments between Ghana and China.</li>
            <li><strong>Professional Handling:</strong> Your goods receive the same care as larger shipments.</li>
          </ul>
        </div>

        <div className="text-section">
          <h2>How It Works</h2>
          <p>
            Groupage allows multiple clients to consolidate their goods into one container. SFGL ensures
            that each client’s cargo is delivered safely and promptly.
          </p>
        </div>

        <div className="text-section ideal-for">
          <h2>Ideal For</h2>
          <ul>
            <li><ShopOutlined className="icon" /> Small and medium businesses</li>
            <li><SmileOutlined className="icon" /> Importers and exporters looking to minimize shipping costs</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Groupage;