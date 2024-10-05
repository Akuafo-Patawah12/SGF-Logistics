import React,{lazy,Suspense,useState,useEffect} from 'react'
import{Routes,Route,useLocation} from "react-router-dom"
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import FAQs from '../Pages/FAQs'
import Loader from '../Icons/Loader'
const HomePage= lazy(()=>import('../Pages/HomePage'))

const Layout = () => {

    const location= useLocation()
    const [path,setPath] = useState("/")
    const [buttonDisplay,setButtonDisplay] = useState(true)

    useEffect(()=>{
          if(location.pathname===path){
              setButtonDisplay(true)
              return 
          }
          setButtonDisplay(false)
    },[location.pathname,path])


    const[showAuth,setShowAuth] = useState(false)
  return (
    <div>

        <Header buttonDisplay={buttonDisplay} setShowAuth={setShowAuth}/>
            <Routes>
                <Route path='/'  element={
                    <Suspense fallback={<Loader />}>
                        <HomePage setShowAuth={setShowAuth} showAuth={showAuth}/>
                    </Suspense> }
                /> 

                <Route path='/FAQs' element={<FAQs />}/>
            </Routes>
       <Footer />
    </div>
  )
}

export default Layout