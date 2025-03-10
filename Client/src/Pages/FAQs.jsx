import React, { useState } from "react";
import "../Styles/FAQ.css"; // Import the CSS file for styling

import { CommentOutlined, UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const FAQs = () => {


  const faqData = [
    {
    question: "How do I ship goods from China to Ghana?",
    answer: "Shipping from China to Ghana is simple with SF Ghana Logistics! We offer air freight for fast delivery and sea freight for cost-effective bulk shipping. Contact us for a quote today!"
    },
    {
    question: "What shipping methods do you offer?",
    answer: "We offer a range of services including sea freight, air freight , RMB  exchange services, door-to-door delivery, container booking and clearance, and  free procurement and sourcing training."
    },
    {
    question: "How much does it cost to ship from China to Ghana?",
    answer: "The cost depends on the shipment size, weight, and method. Reach out to us for a free quote!"
    },
    {
    question: "What is the estimated shipping time from China to Ghana?",
    answer: "The shipping time depends on the method used. Sea freight typically takes 25-40 days, while air freight is much faster, averaging 5-10 days. Factors like customs clearance and seasonal demand can also affect delivery times."
    }
    ];

  const faqs = [

    
    {
      question: "How do I track my shipment?",
      answer:
        "You can easily track your shipment using our real-time tracking feature available on our website. Simply enter your tracking number to view the current status and location of your goods.",
    },
    {
      question: "What is the minimum chargeable volume (CBM)?",
      answer:
        "The minimum chargeable volume is 0.02 CBM. Shipments below this volume will be charged at the minimum rate.",
    },
    {
      question: "How does SFGL ensure the safety of my goods?",
      answer:
        "We implement rigorous security checks, expert handling, and adhere to international shipping regulations to ensure the safety of your goods. ",
    },
    {
      question: "Can I get credit terms for container clearance?",
      answer:
        "Yes, we offer flexible payment options for container clearance to support your cash flow needs.",
    },
    {
      question:"What are the storage charges at your warehouse?",
      answer:"Goods remaining in our warehouse for more than 4 days post-arrival incur a storage charge of GHS 20 per CBM per day." 
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main style={{display:"flex",flexDirection:'column'}}>
    <h1 className="faq-title">Frequently Asked Questions</h1>
    <div className="sf-faq-container">
    {faqData.map((item, index) => (
      <motion.div
        key={index}
        className="sf-faq-item"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <div className="sf-faq-question">
          <UserOutlined className="sf-icon" />
          <div className="sf-question-text">{item.question}</div>
        </div>
        <div className="sf-faq-answer">
          <div className="sf-answer-text">{item.answer}</div>
          <CommentOutlined className="sf-icon" />
        </div>
      </motion.div>
    ))}
  </div>
    <div className="faq-container">
    
      <div className="faq-content">
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span className="question-text">{faq.question}</span>
                <span className="faq-toggle">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="faq-answer" >{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
    </main>
  );
};

export default FAQs;
