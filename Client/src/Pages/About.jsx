import React,{useEffect, useRef, useState} from 'react'
import { AimOutlined,BulbOutlined } from '@ant-design/icons'
import "./Components/Services.css"
import "./About.css"
import AboutIcon from '../Icons/AboutIcon'

const About = () => {
    const parentRef= useRef(null)
    const childRef1= useRef(null)
    const childRef2= useRef(null)
    

    const [index,setIndex] = useState(0)
    useEffect(()=>{
        const child= [childRef1.current,childRef2.current]
        const childLeft = child[index].offsetLeft;
        parentRef.current.scrollTo({
          left: childLeft,
          behavior: "smooth" // Add smooth scrolling
        });
    },[index])
    
        
    
  return (
    <div>
        <div className='service_image_header'>
           <section style={{position:"absolute",inset:"0",background:"rgb(0,0,0,0.3)",fontSize:"40px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>
                About Us
           </section>
            
        </div>

        <div style={{marginInline:"auto",width:"fit-content",padding:"5px 0 0 5px",border:"2px solid  #A7C756",borderRadius:"5px",marginBottom:"10px"}}><AboutIcon /> </div>


        <div className="abt-flex">
        <div  className='about_flex'>
        <section style={{borderBottom:"5px solid #eee",paddingBottom:"40px"}} className="about_org">
            <p style={{textAlign:"justify",fontSize:"15px"}} className="about_p">
                Established in February 2019, Shun Feng Ghana Logistics (SFGL) has rapidly grown into one of 
                West Africa's most trusted logistics providers, specializing in the efficient and seamless shipping 
                of goods between Ghana and China. With our core values rooted in reliability, transparency, and 
                customer satisfaction, we are committed to upholding our motto: "Whatever the load, we carry 
                it." 
            </p>
        </section>

        <section style={{display:"flex",gap:"5px",marginBlock:"30px 5px"}}>
            <button onClick={()=> setIndex(0)} className='about_btn'><AimOutlined style={{color:"#A7C756"}}/> Mission</button>
            <button onClick={()=> setIndex(1)} className='about_btn'><BulbOutlined style={{color:"#A7C756"}}/>Vission</button>
        </section>
        
        <section ref={parentRef} style={{ border:"1px solid #ddd",borderRadius:"5px" }} className="parent">
             <div ref={childRef1} className="child">
                <p style={{width:"95%",marginInline:"auto",fontSize:"15px"}}>
                 Our mission is to provide innovative and efficient logistics solutions that bridge the gap between 
                Ghana and China, delivering superior customer satisfaction through reliability, timely delivery, 
                and professional handling of all shipments.
                </p> 
             </div>
             <div ref={childRef2} className="child">
              <p style={{width:"95%",marginInline:"auto",fontSize:"15px"}}>
                To be the leading logistics provider between Ghana and China, recognized for our commitment 
                to excellence, innovation, and customer-focused solutions. 
              </p>
             </div>
        </section>
        </div>
        
        <div className='about_flex'>
            <img src="../SFG_images/Ship2.jpg" alt="image" style={{height:"400px"}}/>
        </div>
        </div>


        <section style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridGap:"10px",width:"95%",margin:"20px auto"}}>
            <div className="about_info">
              <span style={{fontSize:"30px",color:"var(--purple)",fontWeight:"700"}}>5+</span> <br/>Years Experience
            </div>
            <div className="about_info">
              <span style={{fontSize:"30px",color:"var(--purple)",fontWeight:"700"}}>99%</span> <br/>Accuraccy Rate
            </div>

            <div className="about_info">
              <span style={{fontSize:"30px",color:"var(--purple)",fontWeight:"700"}}>100+</span> <br/>Trusted Partners
            </div>
        </section>
    </div>
  )
}

export default About