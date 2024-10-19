import React from 'react'
import "./Components/Contact.css"

const ContactUs = () => {
  return (
    <main>
        <section className='header_image'>
           <div className='contact_header'>Contact Us</div>
        </section>
        <section>
            <div>
                <h3>Send us a message</h3>
                <p style={{fontSize:"19px",color:"#444",fontWeight:"400"}}>
                   Have questions or need assistance? Send us a message, and our dedicated team at 
                   Integrity Link Logistics will get back to you promptly. We’re here to provide you with the support 
                   and information you need to make your logistics experience seamless and efficient.
                </p>

                <div className="contact">
                <form className='contact_form'>
                    <input type="text" placeholder='Your name' name="" id="" />
                    <input type="text" placeholder='Your email' name="" id="" />
                    <input type="text" placeholder='Your name' name="" id="" />
                    <textarea rows={3}></textarea>
                    <button>Send Message</button>
                </form>
            </div>
            </div>
            
        </section>
    </main>
  )
}

export default ContactUs