import React,{useRef,useState,useEffect} from 'react'
import "./Components.css"

import SignUp from './Auth_foder/SignUp'
import Login from './Auth_foder/Login'
import { ReactComponent as SvgIcon } from "../Icons/svgl_svg_format_2.svg"
const Authentication = () => {
    
    
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


    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
  return (
    <div className='auth_container'>
        <div className="auth">
        <div className='auth_routes'>
        <SvgIcon />
            <section>
                <button onClick={()=> slider(0)} className="auth_link" >Sign up</button>
                <button onClick={()=> slider(1)} className="auth_link">Login</button>
            </section>

        </div>
     <section ref={parentRef} className='auth_slider' style={{ height: `${windowHeight}px` }}>
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