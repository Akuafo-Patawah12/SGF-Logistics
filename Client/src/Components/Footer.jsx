import React from 'react'
import {FacebookOutlined, GlobalOutlined, HomeOutlined, InstagramOutlined, LeftCircleFilled, PhoneOutlined, RightCircleFilled,  WhatsAppOutlined, YoutubeOutlined} from '@ant-design/icons'

import Accordion from './Accordion'

const Footer = () => {
  return (
    <footer className="footer">

        <main style={{width:"90%", marginInline:"auto"}}>
        <section className="About">
          

         <Accordion header="Services" span1="Air Freight" span2="Shipping" span3="Door to door delivery"/>
         <Accordion header="Info" span1="FAQs" span2="Shipping" span3=""/>
         <Accordion header="Polices" span1="Terms & conditions" span2="" span3=""/>
          
          
          
          
          

        </section>
        <section className="socials_media_handles">
          <a href="https://www.instagram.com/sfghanalogistic?igsh=bnlyd3R2d3FyN2du" target="_blank"><InstagramOutlined /> </a>
          <a href="https://www.youtube.com/@SFGhanaLogistics" target="_blank"><YoutubeOutlined/> </a>
          <a href="https://www.facebook.com/profile.php?id=61560412809015&mibextid=ZbWKwL" target="_blank"><FacebookOutlined /> </a>
          <a href="https://t.me/sfghanalogistics" target="_blank"> </a>
          <a href="https://whatsapp.com/channel/0029VahZ9ep9hXFEXBAVWL3G" target="_blank"><WhatsAppOutlined/> </a>
        </section>
        </main>  
      </footer>
  )
}

export default Footer