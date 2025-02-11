import React from 'react'
import {DoubleRightOutlined, VideoCameraOutlined,EnvironmentOutlined, FacebookOutlined, GlobalOutlined, HomeOutlined, InstagramOutlined, LeftCircleFilled, MailOutlined, PhoneOutlined, RightCircleFilled,  WhatsAppOutlined, YoutubeOutlined} from '@ant-design/icons'
import { ReactComponent as Tiktok} from "../Icons/Tiktok.svg"
import Accordion from './Accordion'
import { Link } from 'react-router-dom'


const Footer = () => {

  const backtotop = () => {
    
    window.scrollTo({top:0,behavior:"smooth"})
  };
  const contact_style={display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #A7C756",color:"#A7C756",textAlign:"center",borderRadius:"5px",width:"30px",height:"30px",paddingLeft:"3px"}
  return (
    <footer className="footer">

        <main style={{marginInline:"auto"}} className='footer_nav'>
          <section style={{color:"#ddd"}} className="nav_1">
            <p>George Bush Highway, Plot No. 67,<br/> Dzorwulu, Accra-Ghana</p>
            <p>+(233)20 811 6360 / 053 948 0433</p>
            <p>sfghanalogistics24@gmail.com</p>

          </section>
          <section style={{color:"#ddd"}} className='nav_1'>
            <h4>Quick Link</h4>
             <Link to={"/"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> Home</div></Link>
             <Link to={"/Services"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> Services</div></Link>
             <Link to={"/About"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> About</div></Link>
             <Link to={"/Contact_Us"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> Contact</div></Link>
          </section>
          
          <section style={{color:"#ddd"}} className='nav_1'>
            <h4>Services we offer</h4>
             <Link to={"/Services/SeaFreight"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> Sea Freight</div></Link>
             <Link to={"/Services/AirFreight"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> Air Freight</div></Link>
             <Link to={"/Services/Door2Door"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> Door to door delivery</div></Link>
             <Link to={"/Services/Procurement"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> Procurement</div></Link>
          </section>

          
          <section style={{color:"#ddd"}} className='nav_1'>
          <h4>Support</h4>
             <Link to={"/About"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> Why choose us</div></Link>
             <Link to={"/TermsAndCondition"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> Terms & Conditions</div></Link>
             <Link to={"/More/FAQs"} onClick={()=>backtotop()}><div><DoubleRightOutlined /> FAQs</div></Link>

          </section>
        <section className="About">
          
         <Accordion header="Quick Links" link="Services" span1="Services" span2="About" span3="Contacts"/>
         <Accordion header="Support" link="TermsAndCondition" span1="Terms & conditions" span2="FAQs" />
          
         
        </section>
        <section className="company_info">
        <div style={{color:"white",marginBlock:"20px",fontSize:"18px"}} className='details'>
          <div style={contact_style}><EnvironmentOutlined /></div>
          <h3>Address</h3>
          <p>George Bush Highway, Dzorwulu,<br/> Accra-Ghana </p>
          </div>
        
        <div style={{color:"white",marginBlock:"20px",fontSize:"18px"}} className='details'>
          <div style={contact_style}><MailOutlined /></div>
          <h3>Email</h3>
          <p>sfghanalogistics24@gmail.com</p>
          </div>

          <div style={{color:"white",fontSize:"18px"}} className='details'>
          <div style={contact_style}><PhoneOutlined style={{transform:"rotate(90deg)"}}/></div>
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
          <a href="https://www.tiktok.com/@sfghanalogistics" target="_blank" rel="noopener noreferrer">
             <Tiktok style={{transform:"translateY(4px)"}}/>
          </a>
        </div>
        </section>
        </main>
        <div className="copyright_header">
          <p>© 2024 SFGL | developed by <a href="https://wa.me/qr/J67ECZFBZBBAF1" target="_blank">@Anej High Tech</a></p>
        </div>


      </footer>
  )
}

export default Footer