import { PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import "./FAQ.css"

const FAQsAccordion = (props) => {
    const[accordion,setAccordion] = useState(false)
  return (
    
        <div style={{background:"#eee", width:"95%",border:"2px solid #ddd",borderBottom:"5px solid #eee", marginInline:"auto", height:`${accordion?"auto":"40px"}`,overflow:'hidden', animation:`${accordion?"animate 0.3s ease-in":"animateDown 0.3s ease-out"}`}}>
            <div style={{display:"flex",justifyContent:"space-between",width:"100%",marginBottom:"5px"}}>
            <h4 style={{display:"flex",height:"40px",alignItems:"center ", width:"auto",marginLeft:"3px"}}>{props.Questions} </h4>
                <button style={{height:"25px",width:"25px",position:"relative"}} onClick={()=> setAccordion(prev=> !prev)}>
                    <section style={{width:"13px", background:"black",height:"3px", rotate:`${accordion?"":"90deg"}`, position:"absolute", transition:"all 0.3s"}}></section>
                    <section style={{width:"13px", background:"black",height:"3px",position:"absolute"}}></section>
                </button>
            </div>

            <p style={{width:"95%",marginTop:"2px",marginInlineStart:"auto", borderLeft:"1px solid #ccc", paddingLeft:"5px", position:"relative"}}>
               <div style={{background:"#aaa",transform:"translateX(-8px)",width:"5px",height:"5px",borderRadius:"50%"}}></div>
                {props.Answers}
                
                <div style={{background:"#aaa",transform:"translateX(-8px)",width:"5px",height:"5px",borderRadius:"50%"}}></div>
            </p>
        </div>


  )
}

export default FAQsAccordion