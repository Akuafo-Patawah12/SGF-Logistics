import React,{useRef,useState} from 'react'
import "./Components.css"
import { CloseOutlined } from '@ant-design/icons'
import SignUp from './Auth_foder/SignUp'
import Login from './Auth_foder/Login'
const Authentication = ({authShow}) => {
    const [showAuth,setShowAuth] =authShow
    
    const parentRef= useRef()
    const formRef1= useRef()
    const formRef2= useRef()
    const formRef3= useRef()

    function slider(index){

        const parent= parentRef.current
        const Children=[
            formRef1.current,
            formRef2.current,
            formRef3.current 

        ]
        const childLeft= Children[index].offsetLeft

        parent.scrollTo(
            {
                left: childLeft,
                behaviour: "smooth"
            }
        )


     

    }
  return (
    <div className='auth_container'>
        <div className="auth">
        <div className='auth_routes'>
            <section>
                <button onClick={()=> slider(0)} >Sign up</button>
                <button onClick={()=> slider(1)}>Login</button>
            </section>
                <button onClick={()=>{setShowAuth(false)}}><CloseOutlined/></button>
        </div>
     <section ref={parentRef} className='auth_slider'>
        <div  ref={formRef1} className='slide'>
            <SignUp />
        </div >

        <div ref={formRef2} className='slide'>
            <Login />
        </div>

        <div ref={formRef3} className='slide'> 
            <input type='email'/>
            <input type='submit'/>
            
        </div>
     </section>
     </div>
    </div>
  )
}


export default Authentication