import {useState,useEffect,useRef} from "react"
import { Routes,Route } from "react-router-dom";
import './App.css';
import Layout from "./Layouts/Layout";
import AdminDashboard from "./Pages/AdminDashbord";
import Login from "./Components/Auth_foder/Login";





function App() {


  return (
    <div className="App">
     

      <Routes>
        <Route path="/Dashboard"  element={<AdminDashboard />} />
        <Route path="/Login"  element={<Login/>} />
         <Route path="/*" element={<Layout />} />
      </Routes>

     

      

      

    </div>
  );
}

export default App;
