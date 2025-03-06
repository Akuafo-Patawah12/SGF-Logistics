import React, { useState } from "react";
import "../Styles/FAQ.css"; // Import the CSS file for styling

const FAQs = () => {
  const faqs = [
    {
      question: "What services does SF Ghana Logistics offer?",
      answer:
        "We offer a range of services including groupage shipping, air cargo, RMB  exchange services, door-to-door delivery, container booking and clearance, and  free procurement and sourcing training.",
    },
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
    <div className="faq-container">
      <div className="faq-content">
        <h1 className="faq-title">Frequently Asked Questions</h1>
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
  );
};

export default FAQs;
