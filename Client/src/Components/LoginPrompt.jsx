import React from "react"
import "./Components.css"
import { CloseCircleOutlined } from "@ant-design/icons"

const LoginPrompt =({prompt})=>{
    const[isPrompt,setPrompt] = prompt;
    return(
     <>
      {isPrompt &&<div className="Login_prompt">
          <p>Please login to preceed</p>
          <button><CloseCircleOutlined /></button>
      </div>}
      </>
    )
}

export default LoginPrompt