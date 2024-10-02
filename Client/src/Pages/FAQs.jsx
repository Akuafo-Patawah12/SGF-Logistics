import React from 'react'
import FAQsAccordion from './Components/FAQsAccordion'

const FAQs = () => {
  return (
    <div >
        <h2>FREQUENTLY ASKED QUESTIONS</h2>
     <div style={{width:"100%", display:"flex",flexDirection:"column"}}>
       <FAQsAccordion 
          Questions="What services does SF Ghana Logistics offer? "

          Answers="We offer a range of services including groupage shipping, air cargo, RMB 
                    exchange services, door-to-door delivery, container booking and clearance, and 
                    free procurement and sourcing training."
       />
        <FAQsAccordion 
           Questions="How do I track my shipment?"

           Answers="You can easily track your shipment using our real-time tracking feature available 
                    on our website. Simply enter your tracking number to view the current status and 
                    location of your goods."    
        />
        <FAQsAccordion 
           Questions="What is the minimum chargeable volume (CBM)?"

           Answers="The minimum chargeable volume is 0.02 CBM. Shipments below this volume 
                    will be charged at the minimum rate. " 
        />
        <FAQsAccordion 
           Questions="How does SFGL ensure the safety of my goods?"

           Answers="We implement rigorous security checks, expert handling, and adhere to 
                    international shipping regulations to ensure the safety of your goods. " 
        />
        <FAQsAccordion 
           Questions="Can I get credit terms for container clearance?"

           Answers="Yes, we offer flexible payment options for container clearance to support your 
                    cash flow needs. " 
        />
        <FAQsAccordion 
           Questions="What are the storage charges at your warehouse?"

           Answers="Goods remaining in our warehouse for more than 4 days post-arrival incur a 
                    storage charge of GHS 20 per CBM per day." 
        />
        </div>
    </div>
  )
}

export default FAQs