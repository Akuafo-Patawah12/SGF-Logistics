import React from 'react'
import {DoubleRightOutlined, EnvironmentOutlined, FacebookOutlined, GlobalOutlined, HomeOutlined, InstagramOutlined, LeftCircleFilled, MailOutlined, PhoneOutlined, RightCircleFilled,  WhatsAppOutlined, YoutubeOutlined} from '@ant-design/icons'

import Accordion from './Accordion'


const Footer = () => {
  const contact_style={display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #A7C756",color:"#A7C756",textAlign:"center",borderRadius:"5px",width:"30px",height:"30px",paddingLeft:"3px"}
  return (
    <footer className="footer">

        <main style={{width:"95%", marginInline:"auto"}} className='footer_nav'>
          <section style={{color:"#ddd"}} className="nav_1">
            <p>George Bush Highway, Plot No. 67, Dzorwulu, Accra-Ghana</p>
            <p>+(233)20 811 6360 / 053 948 0433</p>
            <p>sfghanalogistics24@gmail.com</p>

          </section>
          <section style={{color:"#ddd"}} className='nav_1'>
            <h4>Quick Link</h4>
             <div><DoubleRightOutlined /> Home</div>
             <div><DoubleRightOutlined /> Services</div>
             <div><DoubleRightOutlined /> About</div>
             <div><DoubleRightOutlined /> Contact</div>
          </section>
          
          <section style={{color:"#ddd"}} className='nav_1'>
            <h4>Services we offer</h4>
             <div><DoubleRightOutlined /> Sea Freight</div>
             <div><DoubleRightOutlined /> Air Freight</div>
             <div><DoubleRightOutlined /> Door to door delivery</div>
             <div><DoubleRightOutlined /> Warehousing</div>
             <div><DoubleRightOutlined /> Procurement</div>
          </section>

          
          <section style={{color:"#ddd"}} className='nav_1'>
          <h4>Support</h4>
             <div><DoubleRightOutlined /> Why choose us</div>
             <div><DoubleRightOutlined /> Terms & Conditions</div>
             <div><DoubleRightOutlined /> FAQs</div>
             <div><DoubleRightOutlined /> Report a Bug</div>
          </section>
        <section className="About">
          
         <Accordion header="Quick Links" link="Services" span1="Services" span2="About" span3="Contact"/>
         <Accordion header="Support" link="TermsAndCondition" span1="Terms & conditions" span2="FAQs" span3="Report a Bug"/>
          
         
        </section>
        <section className="company_info">
        <div style={{color:"white",marginBlock:"20px",fontSize:"18px"}}>
          <div style={contact_style}><EnvironmentOutlined /></div>
          <h3>Address</h3>
          <p>George Bush Highway, Dzorwulu,<br/> Accra-Ghana </p>
          </div>
        
        <div style={{color:"white",marginBlock:"20px",fontSize:"18px"}}>
          <div style={contact_style}><MailOutlined /></div>
          <h3>Email</h3>
          <p>sfghanalogistics24@gmail.com</p>
          </div>

          <div style={{color:"white",fontSize:"18px"}}>
            <div style={contact_style}><PhoneOutlined /></div>
            <h4>Telephone</h4>
            <p>020 811 6360 / 053 948 0433</p>
          </div>
          </section>

        <section className="socials_media_handles">
          <h5 style={{color:"white"}}>Follow Us</h5>
          <div>
          <a href="https://www.instagram.com/sfghanalogistic?igsh=bnlyd3R2d3FyN2du" target="_blank"><InstagramOutlined /> </a>
          <a href="https://www.youtube.com/@SFGhanaLogistics" target="_blank"><YoutubeOutlined/> </a>
          <a href="https://www.facebook.com/profile.php?id=61560412809015&mibextid=ZbWKwL" target="_blank"><FacebookOutlined /> </a>
          <a href="https://t.me/sfghanalogistics" target="_blank"> </a>
          <a href="https://whatsapp.com/channel/0029VahZ9ep9hXFEXBAVWL3G" target="_blank"><WhatsAppOutlined/> </a>
        </div>
        </section>
        </main>
        <div className="copyright_header">
          <p>Copyright © 2024 | developed by @Anej High Tech</p>
        </div>


      </footer>
  )
}

export default Footer