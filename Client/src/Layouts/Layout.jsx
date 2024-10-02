import React,{lazy,Suspense,useState} from 'react'
import{Routes,Route} from "react-router-dom"
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import FAQs from '../Pages/FAQs'
const HomePage= lazy(()=>import('../Pages/HomePage'))

const Layout = () => {

    const[showAuth,setShowAuth] = useState(false)
  return (
    <div>

        <Header setShowAuth={setShowAuth}/>
            <Routes>
                <Route path='/'  element={
                    <Suspense fallback="Loading...">
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