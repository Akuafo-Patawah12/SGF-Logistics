import React from 'react'
import { PhoneOutlined,  WhatsAppOutlined,  EnvironmentOutlined, MailOutlined,FacebookOutlined,  InstagramOutlined,  YoutubeOutlined, TikTokOutlined}  from '@ant-design/icons'






const Header = () => {
 
  return (
    <header className="main_header">
      <div className="h_child1">
          <button style={{border:"none",}}><EnvironmentOutlined /> Kwei Okyerema St,<br/> Dzorwulu Accra </button>
          <button style={{border:"none"}}><PhoneOutlined style={{rotate:"90deg"}}/> 020 811 6360 / 053 948 0433</button>
          <button style={{border:"none"}}><MailOutlined /> sfghanalogistics24@gmail.com</button>
          
          <section style={{display:"flex", alignItems:"center",justifyContent:"center",gap:"5px",color:"white"}} className="icon_link">
         
          <a href="https://www.instagram.com/sfghanalogistic?igsh=bnlyd3R2d3FyN2du" rel="noreferrer" target="_blank"><InstagramOutlined /> </a>
          <a href="https://www.youtube.com/@SFGhanaLogistics" rel="noreferrer" target="_blank"><YoutubeOutlined/> </a>
          <a href="https://www.facebook.com/profile.php?id=61560412809015&mibextid=ZbWKwL" rel="noreferrer" target="_blank"><FacebookOutlined /> </a>
          <a href="https://t.me/sfghanalogistics" rel="noreferrer" target="_blank"> </a>
          <a href="https://whatsapp.com/channel/0029VahZ9ep9hXFEXBAVWL3G" rel="noreferrer" target="_blank"><WhatsAppOutlined/> </a>
          <a href="https://www.tiktok.com/@sfghanalogistics" target="_blank" rel="noopener noreferrer">
              <TikTokOutlined />
          </a>
        
          </section>
      </div>
      
        

      </header>
  )
}

export default Header