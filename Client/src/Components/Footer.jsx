import React from 'react'
import {DoubleRightOutlined,EnvironmentOutlined, FacebookOutlined,  MailOutlined, PhoneOutlined, WhatsAppOutlined, YoutubeOutlined,TikTokOutlined} from '@ant-design/icons'

import Accordion from './Accordion'
import { Link } from 'react-router-dom'

import { Typography, Space, Card } from "antd";

const { Text } = Typography;



const Footer = () => {
  const { Title } = Typography;
  const backtotop = () => {
    
    window.scrollTo({top:0,behavior:"smooth"})
  };
  const contact_style={display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #A7C756",color:"#A7C756",textAlign:"center",borderRadius:"5px",width:"30px",height:"30px",paddingLeft:"3px"}
  return (
    <footer className="footer">

        <main style={{marginInline:"auto"}} className='footer_nav'>
        <Card
        className="nav_1"
      style={{
        background: "transparent",
        color: "#ddd",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Text style={{ color: "#ddd", fontSize: "16px", display: "block", marginBottom: "10px" }}>
        <EnvironmentOutlined style={{ marginRight: "8px" }} />
        George Bush Highway, Plot No. 67,<br/> Dzorwulu, Accra-Ghana
      </Text>
      <Text style={{ color: "#ddd", fontSize: "16px", display: "block", marginBottom: "10px" }}>
        <PhoneOutlined style={{ marginRight: "8px" }} />
        +(233)20 811 6360 / 053 948 0433
      </Text>
      <Text style={{ color: "#ddd", fontSize: "16px", display: "block" }}>
        <MailOutlined style={{ marginRight: "8px" }} />
        sfghanalogistics24@gmail.com
      </Text>
    </Card>
          
          <Card

          className="nav_1"
      style={{
        background: "transparent",
        color: "#ddd",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Title level={4} style={{ color: "#fff", marginBottom: "15px" }}>
        Quick Links
      </Title>

      <Space direction="vertical" size="middle">
        <Link to="/" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> Home
        </Link>
        <Link to="/Services" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> Services
        </Link>
        <Link to="/About" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> About
        </Link>
        <Link to="/Contact_Us" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> Contact
        </Link>
      </Space>
    </Card>
          
    <Card
      className="nav_1"
      style={{
        background: "transparent",
        color: "#ddd",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Title level={4} style={{ color: "#fff", marginBottom: "15px" }}>
        Services We Offer
      </Title>

      <Space direction="vertical" size="middle">
        <Link to="/Services/SeaFreight" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> Sea Freight
        </Link>
        <Link to="/Services/AirFreight" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> Air Freight
        </Link>
        <Link to="/Services/Door2Door" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> Door to Door Delivery
        </Link>
        <Link to="/Services/Procurement" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> Procurement
        </Link>
      </Space>
    </Card>

          
          <Card
          className="nav_1"
      style={{
        background: "transparent",
        color: "#ddd",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Title level={4} style={{ color: "#fff", marginBottom: "15px" }}>
        Support
      </Title>

      <Space direction="vertical" size="middle">
        <Link to="/About" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> Why Choose Us
        </Link>
        <Link to="/TermsAndCondition" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> Terms & Conditions
        </Link>
        <Link to="/More/FAQs" onClick={backtotop} style={{ color: "#ddd", fontSize: "16px" }}>
          <DoubleRightOutlined /> FAQs
        </Link>
      </Space>
    </Card>
        <section className="About_footer">
          
         <Accordion header="Quick Links" link="Services" span1="Services" span2="About" span3="Contact"/>
         <Accordion header="Support" link="TermsAndCondition" span1="Terms & conditions" span2="FAQs" />
          
         
        </section>
        <section className="company_info">
        <div style={{color:"white",marginBlock:"20px",fontSize:"18px"}} className='details'>
          <div style={contact_style}><EnvironmentOutlined /></div>
          <h3>Address</h3>
          <p> Kwei Okyerema St, Dzorwulu <br/> Accra-Ghana </p>
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

          

        
        </main>
        <div className="copyright_header">
          <p>© 2024 SFGL | developed by <a href="https://wa.me/qr/J67ECZFBZBBAF1" target="_blank" rel="noopener noreferrer" style={{fontSize:"14px"}}>@Anej High Tech</a></p>
          <Card
          className="social_media_handles"
      style={{
        background: "transparent",
        borderRadius: "10px",
        
        height:"100%",
        
      }}
    >
     
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        
        <a href="https://www.youtube.com/@SFGhanaLogistics" target="_blank" rel="noopener noreferrer">
          <YoutubeOutlined style={{ fontSize: "24px", color: "#FF0000" }} />
        </a>
        <a href="https://www.facebook.com/profile.php?id=61560412809015&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
          <FacebookOutlined style={{ fontSize: "24px", color: "#1877F2" }} />
        </a>
        
        <a href="https://whatsapp.com/channel/0029VahZ9ep9hXFEXBAVWL3G" target="_blank" rel="noopener noreferrer">
          <WhatsAppOutlined style={{ fontSize: "24px", color: "#25D366" }} />
        </a>
        <a href="https://www.tiktok.com/@sfghanalogistics" target="_blank" rel="noopener noreferrer">
        <TikTokOutlined style={{ fontSize: "24px", color: "#25D366" }}/>
        </a>
      </div>
    </Card>
        </div>


      </footer>
  )
}

export default Footer