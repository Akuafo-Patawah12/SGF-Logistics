import React, { useState } from "react";
import "./Components/FAQ.css"; // Import the CSS file for styling

const FAQs = () => {
  const faqs = [
    {
      question: "What services does Andy Logistics offer?",
      answer:
        "Andy Logistics specializes in sea freight, air freight, warehousing, and supply chain management services tailored to your needs.",
    },
    {
      question: "How can I track my shipment?",
      answer:
        "You can track your shipment using the 'Track Shipment' feature on our website. Simply enter your tracking ID to get real-time updates.",
    },
    {
      question: "What is the estimated delivery time for shipments?",
      answer:
        "Delivery times depend on the destination and type of service chosen. For more accurate estimates, contact our support team or check your shipment details.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@andylogistics.com or by calling +1 (123) 456-7890.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping services across multiple destinations worldwide.",
    },
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
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
