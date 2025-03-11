import {useState,Suspense,lazy} from "react"
import { Routes,Route } from "react-router-dom";
import './App.css';
import Layout from "./Layouts/Layout";


import Loader from "./Icons/Loader"

import OTP from "./Pages/Auth/OTP";
import UsersList from "./Pages/UserList"
import ContainerPage from "./Pages/ContainerPage"
import ResetPassword from "./Pages/Auth/ResetPassword";
const Login = lazy(()=> import('./Pages/Auth/Login'))
const SignUp = lazy(()=> import('./Pages/Auth/SignUp'))
const ForgetPassword= lazy(()=> import('./Pages/Auth/ForgetPassword'))







function App() {
const [email,setEmail] = useState("")
function getEmail(mail){
    setEmail(mail)
}
  return (
    <div className="App">
     

      <Routes>
      

<Route path='/Containers' element={
                       
                       <ContainerPage />   
                     } 
                 />

<Route path='/users' element={
                       
                       <UsersList />   
                     } 
                 />

        
        <Route path="/verify" element={<OTP mail={email}/>} />

        <Route path='/Auth/login' element={<Login getEmail={getEmail}/>}/>

                <Route path='/Auth/forget_password' element={<ForgetPassword />  } />
                <Route path="/Auth/reset_password/:token" element={<ResetPassword />} />

                <Route path='/Auth/sign_up' element={<SignUp /> }/>
                <Route path="/*" element={<Layout />} />
      </Routes>

     

      

      

    </div>
  );
}

export default App;
