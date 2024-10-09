import React,{lazy,Suspense,useState,useEffect} from 'react'
import{Routes,Route,useLocation} from "react-router-dom"
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import FAQs from '../Pages/FAQs'
import Loader from '../Icons/Loader'
import TermsAndCondition from '../Pages/TermsAndCondition'
const Tracking= lazy(()=> import('../Pages/Tracking'))
const Orders = lazy(()=> import( '../Pages/Orders'))
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
                <Route path='/Terms' element={<TermsAndCondition />} />
                <Route path='/FAQs' element={<FAQs />}/>
                <Route path='/Orders' element={
                    <Suspense fallback={<Loader />}>
                        <Orders />
                    </Suspense>} />
                    <Route path='/Tracking' element={
                    <Suspense fallback={<Loader />}>
                        <Tracking />
                    </Suspense>} /> 
            
            </Routes>
            
       <Footer />
    </div>
  )
}

export default Layout