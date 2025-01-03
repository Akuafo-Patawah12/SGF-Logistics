import React,{useState} from 'react'
import FAQsAccordion from './Components/FAQsAccordion'
import { EnvironmentFilled, MailFilled, PhoneFilled, SendOutlined } from '@ant-design/icons'




const FAQs = () => {
   
  const[formData,setFormData] = useState({
    email:"",
    message:""
  })
   const askedQuestion=async()=>{
      try{
         const response = await fetch("http://localhost:4040/asked_question", {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({formData}), // example payload
          
         });
      }catch(error){
        console.log(error)
      }
  }


   const InputStyle={padding: "10px"}
  return (
    <div className="parent">
      <section className='head_image'>
        <div>
          <h4>FAQ's</h4>
        </div>

      </section>
        <h4 style={{marginTop:"30px",marginLeft:"2.5%",marginBlock:"20px",fontSize:"25px",fontWeight:"700"}}>FREQUENTLY ASKED <span className='faq_title'>QUESTIONS.</span> </h4>
     <div className="faq" style={{width:"95%",marginInline:"auto"}}>
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

        <h4 style={{marginTop:"30px",marginLeft:"2.5%",marginBlock:"20px"}}>Have any Questions? Get in Touch</h4>
        <div className="questions_info" >
           
           <form onSubmit={askedQuestion} className='child1'>
            <section style={{display:"flex",width:"100%",gap:"10px",flexDirection:"column"}}>
              <input type="email" placeholder='Enter your email' onChange={(e)=>setFormData({...formData,email:e.target.value})} style={InputStyle}/>
              
              <textarea placeholder={"Message"} onChange={(e)=>setFormData({...formData,message:e.target.value})}></textarea>
              <button type='submit' style={InputStyle}>Send <SendOutlined /></button>
            </section>
           </form>
          
        </div>
    </div>
  )
}

export default FAQs