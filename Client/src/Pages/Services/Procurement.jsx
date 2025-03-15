import React from 'react'
import {Link} from "react-router-dom"
import  Secure  from "../../Icons/Secure.jsx"
import  Speed  from "../../Icons/Speed.jsx"
import  Global  from "../../Icons/Global.jsx"
import "./SubPages.css"

const Procurement = () => {
  return (


<div className="freight_container">
        <div className="relative-container relative-2">
        <section className="overlay-section">
          <h1 className="title">
          Free Procurement
          </h1>
        </section>
      </div>
        {/* Page Header */}
        <div className="page_section">
        <header className="freight_head">
          <p>
            Our Free Procurement and Sourcing Training empowers businesses with essential skills for 
            managing logistics, procurement, and international sourcing. This service is designed to help 
            businesses improve their operations without additional cost.
          </p>
        </header>
  
        {/* Introduction Section */}
        
        <section className="freight_section">
          <h2>
            Why Choose Our Door to door Services?
          </h2>
          <p>
          Our training programs are completely free of charge, allowing participants to gain valuable knowledge without any cost. Led by industry experts with years of experience in procurement and international trade, these sessions provide deep insights and practical guidance. Participants will learn actionable strategies to optimize procurement processes and make informed sourcing decisions, ensuring efficiency and success in their operations.
          </p>
        </section>
  
        {/* Features Section */}
        <section className="grid">
          <div className="card">
            <div className="icon icon-blue">
              <Global style={{transform:"translateX(1px)"}}/>
            </div>
            <h3>Global Reach</h3>
            <p>
              We connect you to destinations across the world with our extensive air freight network.
            </p>
          </div>
  
          <div className="card">
            <div className="icon icon-green">
              <Speed style={{transform:"translateX(1px)"}}/>
            </div>
            <h3>Speed & Reliability</h3>
            <p>
              Fast transit times and reliable delivery schedules to meet your business needs.
            </p>
          </div>
  
          <div className="card">
            <div className="icon icon-yellow">
              <Secure style={{transform:"translateX(1px)"}}/>
            </div>
            <h3>Secure Handling</h3>
            <p>
              Professional cargo handling and monitoring to ensure your shipment's safety.
            </p>
          </div>
        </section>
  
        {/* Testimonials Section */}
        <section className="section">
          <h2>
            What Our Clients Say
          </h2>
          <div className="test">
            <div className="testimonial_">
              <p>
                "Their door to door services are outstanding! Our goods arrived on time, and the team was incredibly professional throughout the process."
              </p>
              <p className="author">- Jane Doe, Logistics Manager</p>
            </div>
            <div className="testimonial_">
              <p>
                "Fast, reliable, and secure! I highly recommend their air freight solutions for anyone looking for premium logistics services."
              </p>
              <p className="author">- John Smith, CEO of ABC Corp</p>
            </div>
          </div>
        </section>
  
        {/* Call-to-Action Section */}
        <section className="cta">
          <h2>We Are Ready To Deliver.</h2>
          <p>
            Get in touch with us today and experience the best air freight services.
          </p>
          <Link to={"/Contact"}>
        <button>
          Contact us
        </button>
        </Link>
        </section>
        </div>
      </div>


    
  )
}

export default Procurement