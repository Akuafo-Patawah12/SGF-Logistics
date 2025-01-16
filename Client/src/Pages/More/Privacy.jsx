import React from "react";
import "./Privacy.css"; // Import the CSS file for styling
import AnimatedBubbles from "../Components/AnimatedBubbles";

const Privacy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-intro">
        At Shun Feng Ghana Logistics (SFGL), we are committed to safeguarding your privacy and
         ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose,
         and protect your information when you visit our website and use our services.
        </p>

        <div className="privacy-sections">
          <section>
            <h2 className="privacy-subtitle">1. Information We Collect</h2>
            <p className="privacy-text">
            We collect personal information that you voluntarily provide when you interact with us
             through our website or services. This may occur when you:
            </p>
            <ul className="privacy-list">
            <li>Register on our website or subscribe to newsletters.</li>
            <li>Request a quote or engage our logistics services.</li>
            <li>Fill out forms, submit inquiries, or interact with our customer service team.</li>
            <li>Participate in surveys, promotions, or other activities related to our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="privacy-subtitle">2. How We Use Your Information</h2>
            <p className="privacy-text">The information we collect is used to:</p>
            <ul className="privacy-list">
            <li><span className="privacy_span">Service Delivery:</span> To provide, operate, and maintain our logistics services, including the processing and management of orders, payments, and shipments.</li>
          <li><span className="privacy_span">Customer Communication:</span> To respond to inquiries, provide customer support, and keep you informed about your shipments and transactions.</li>
          <li><span className="privacy_span">Marketing and Updates:</span> To send you newsletters, marketing communications, and updates about our services (only with your consent).</li>
          <li><span className="privacy_span">Improving Our Services:</span> To enhance our website, improve service offerings, and optimize user experience based on usage patterns and customer feedback.</li>
          <li><span className="privacy_span">Legal and Compliance:</span> To comply with legal obligations, protect our rights, and ensure the security of our systems and services.</li>
        
        </ul>
          </section>

          <section>
            <h2 className="privacy-subtitle">3. Information Sharing</h2>
            <p className="privacy-text">
            <p>We value your privacy and do not sell or rent your personal information to third parties. However, 
               we may share your information under specific circumstances, including:</p>
            </p>
            <ul className="privacy-list">
              <li><span className="privacy_span">Service Providers:</span> We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering logistics services. These partners are bound by strict confidentiality agreements and are only permitted to use your data as necessary to provide their services.</li>
              <li><span className="privacy_span">Business Partners or Affiliates:</span> We may collaborate with affiliated companies or business partners to offer related services or promotions that may be of interest to you. Any such data sharing is done with your consent.</li>
              <li><span className="privacy_span">Legal Requirements:</span> We may disclose your information when required by law or in response to valid legal requests from governmental or regulatory authorities. This may include situations where we need to protect the safety and security of our company, clients, or others.</li>
            </ul>
          </section>

          <section>
            <h2 className="privacy-subtitle">4. Types of Information We Collect:</h2>
            
            <ul className="privacy-list">
            <li><span className="privacy_span">Personal Details:</span> Name, email address, phone number, and other contact details.</li>
            <li><span className="privacy_span">Shipping Information:</span> Delivery address, tracking number, and shipping mark.</li>
            <li><span className="privacy_span">Billing Information:</span> Payment details, including credit card or bank account information.</li>
            <li><span className="privacy_span">Business Information:</span> Details about your business, if applicable, and relevant shipping needs.</li>
            </ul>
          </section>

          <section>
            <h2 className="privacy-subtitle">5. Changes to This Privacy Policy</h2>
            <p className="privacy-text">SFGL may update this Privacy Policy periodically to reflect changes in our practices, services, or legal obligations. Any updates will be posted on our website with the revised effective date. We encourage you to review this Privacy Policy regularly to stay informed about how we protect your personal information.</p>
            
          </section>


          <section>
            <h2 className="privacy-subtitle">7. Contact Us</h2>
            <p className="privacy-text">
              If you have any questions or concerns about this Privacy Policy,
              please contact us:
            </p>
            <ul className="privacy-contact">
              <li>Email: sfghanalogistics24@gmail.com</li>
              <li>Phone: 020 811 6360 / 053 948 0433</li>
              <li>Address:  George Bush Highway, Dzorwulu,
              Accra-Ghana</li>
            </ul>
            <AnimatedBubbles />
          </section>
        </div>
        
      </div>
    </div>
  );
};

export default Privacy;



