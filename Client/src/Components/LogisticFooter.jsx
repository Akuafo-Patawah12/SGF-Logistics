
import React from "react"
import { TikTokOutlined,WhatsAppOutlined ,InstagramOutlined,YoutubeOutlined,FacebookOutlined} from "@ant-design/icons"
import { Link } from "react-router-dom"
import "./Components.css"

const LogisticFooter=()=>{
    return(
        <section style={{marginTop:"50px"}}>
           <div style={{color:"#222",marginInline:"auto",width:"fit-content"}}>
          <a href="https://www.instagram.com/sfghanalogistic?igsh=bnlyd3R2d3FyN2du" target="_blank"><InstagramOutlined /> </a>
          <a href="https://www.youtube.com/@SFGhanaLogistics" target="_blank"><YoutubeOutlined/> </a>
          <a href="https://www.facebook.com/profile.php?id=61560412809015&mibextid=ZbWKwL" target="_blank"><FacebookOutlined /> </a>
          <a href="https://t.me/sfghanalogistics" target="_blank"> </a>
          <a href="https://whatsapp.com/channel/0029VahZ9ep9hXFEXBAVWL3G" target="_blank"><WhatsAppOutlined/> </a>
          <a href="https://www.tiktok.com/@sfghanalogistics" target="_blank" rel="noopener noreferrer">
             <TikTokOutlined />
          </a>
          </div>
          <nav className="log_footer" style={{fontSize:"11px" ,display:"flex",flexWrap:"wrap",width:"70%",marginTop:"6px",marginInline:"auto",justifyContent:"center"}}>
           <Link to={"/Contact"}><span className="link">Contact</span></Link>
           <Link to={"/More/FAQs"}><span className="link">FAQ's</span></Link>
           <Link to={"/Services"}><span className="link link_3">Services</span></Link>
           <Link to={"/TermsAndCondition"}><span className="link">Terms & Conditions</span></Link>
           <Link to={"/About"}><span className="link link_5">About</span></Link>
          </nav>

          <div style={{fontSize:"14px",padding:"10px 0",width:"fit-content",marginInline:"auto ",marginTop:"13px"}}>© 2024 SFGL | developed by <a href="https://wa.me/qr/J67ECZFBZBBAF1" target="_blank" rel="noreferrer" style={{fontSize:"14px"}}>@Anej High Tech</a></div>
        </section>
    )
}


export default LogisticFooter