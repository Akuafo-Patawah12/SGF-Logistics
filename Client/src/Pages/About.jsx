import React, { useState } from 'react';
import { AimOutlined, BulbOutlined, RocketOutlined, GlobalOutlined } from '@ant-design/icons';
import './About.css';
import { motion } from 'framer-motion';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <div className="about-container">
      <header className="about-header">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>About Us</motion.h1>
      </header>

      <section className="about-content">
        <motion.div className="about-text" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <p>
            Established in February 2019, Shun Feng Ghana Logistics (SFGL) has rapidly grown into one of
            West Africa's most trusted logistics providers, specializing in the efficient and seamless shipping
            of goods between Ghana and China. Our values focus on reliability, transparency, and customer satisfaction.
          </p>
        </motion.div>

        <motion.img src="../SFG_images/s.jpg" alt="Shipping Logistics" className="about-image" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} />
      </section>

      <section className="mission-vision">
        <div className="btn-group">
          <button onClick={() => setActiveTab('mission')} className={activeTab === 'mission' ? 'active2' : ''}>
            <AimOutlined /> Mission
          </button>
          <button onClick={() => setActiveTab('vision')} className={activeTab === 'vision' ? 'active2' : ''}>
            <BulbOutlined /> Vision
          </button>
        </div>

        <motion.div className="tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          {activeTab === 'mission' ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              Our mission is to provide innovative and efficient logistics solutions that bridge the gap between
              Ghana and China, delivering superior customer satisfaction through reliability and timely delivery.
            </motion.p>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              To be the leading logistics provider between Ghana and China, recognized for our commitment to excellence,
              innovation, and customer-focused solutions.
            </motion.p>
          )}
        </motion.div>
      </section>

      <section className="features">
        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <RocketOutlined className="feature-icon" />
          <h3>Fast & Reliable</h3>
          <p>Quick and secure shipping services tailored to your needs.</p>
        </motion.div>
        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <GlobalOutlined className="feature-icon" />
          <h3>Global Reach</h3>
          <p>Connecting businesses worldwide with seamless logistics solutions.</p>
        </motion.div>
      </section>

      <section className="stats-grid">
        <motion.div className="about_info" whileHover={{ scale: 1.1, rotate: 2 }}>
          <span className="highlight">5+</span>
          <p>Years Experience</p>
        </motion.div>
        <motion.div className="about_info" whileHover={{ scale: 1.1, rotate: -2 }}>
          <span className="highlight">99%</span>
          <p>Accuracy Rate</p>
        </motion.div>
        <motion.div className="about_info" whileHover={{ scale: 1.1, rotate: 2 }}>
          <span className="highlight">100+</span>
          <p>Trusted Partners</p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;