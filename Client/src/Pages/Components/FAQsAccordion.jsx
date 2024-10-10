import { UpOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import "./FAQ.css"

const FAQsAccordion = (props) => {
    const[accordion,setAccordion] = useState(false)
  return (
    
        <div style={{background:"#eee", width:"95%",border:"1px solid #ddd",borderBottom:"5px solid #eee", marginInline:"auto", height:`${accordion?"auto":"50px"}`,overflow:'hidden', animation:`${accordion?"animate 0.3s ease-in":"animateDown 0.3s ease-out"}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",marginBottom:"5px"}}>
            <p style={{color:"#222",display:"flex",height:"50px",maxWidth:"70%",alignItems:"center ", width:"auto",marginLeft:"8px",fontSize:"16px",fontWeight:"600"}}>{props.Questions}</p>
                <button style={{display:"flex",alignItems:"center",justifyContent:"center",width:"30px",height:"30px",marginRight:"8px",border:"1px solid #aaa",textAlign:"center",borderRadius:"50%",height:"25px",width:"25px",rotate:`${accordion?"":"180deg"}`, transition:"all 0.3s"}} onClick={()=> setAccordion(prev=> !prev)}>
                   <UpOutlined />
                </button>
            </div>

            <p style={{width:"80%",marginTop:"2px",paddingBlock:"10px",marginLeft:"30px", borderLeft:"1px solid #ccc", paddingLeft:"5px", position:"relative"}}>
               <div style={{background:"#aaa",transform:"translateX(-8px)",width:"5px",height:"5px",borderRadius:"50%"}}></div>
                {props.Answers}
                
                <div style={{background:"#aaa",transform:"translateX(-8px)",width:"5px",height:"5px",borderRadius:"50%"}}></div>
            </p>
        </div>


  )
}

export default FAQsAccordion