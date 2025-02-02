import React,{useState} from 'react'
import './Auth.css'; 
import axios from "axios"
import {useNavigate} from "react-router-dom"
import ButtonLoader from '../../Icons/ButtonLoader';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        account_type:"User",
        password: '',
        rememberMe:false
       
      });
    
      const [errors, setErrors] = useState({});
      const [success, setSuccess] = useState(false);
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      // Validation (you can expand this further)
      const validationErrors = {};

      const handleFocus = () => {
        setErrors("");
      };

      const [loader,setLoader]= useState(false)
      const navigate= useNavigate()
      const handleSubmit = async(e) => {
        e.preventDefault();
        setLoader(true)

       try{

        const response = await fetch("https://sfghanalogistics.com", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({formData}), // example payload
          credentials: 'include'  // This ensures cookies are sent with the request
        });
    
        const data = await response.json();

        
        
        
        
        
        if (!formData.email) {
          validationErrors.email = "Email is required";
          setLoader(false)
          return setErrors(validationErrors)
        }

        if (!formData.password){
          validationErrors.password = "Password is required";
          setLoader(false)
           return setErrors(validationErrors)
    }
        if (response.status===400){
           validationErrors.password="Invalid accout type"
           setLoader(false)
           return setErrors(validationErrors)
        }
       
        if (response.status===404) {
          validationErrors.password = "Email doesn't exist";
          setLoader(false)
        }
        if (response.status===401){
          validationErrors.password = "Invalid password";
          setLoader(false)
       }
    
        setErrors(validationErrors);
    
        // If there are no validation errors, show success message
        if (Object.keys(validationErrors).length === 0) {
          if(data.message==="Logged in as a client" ){
            setLoader(false)
          setSuccess(true);
         
          navigate(`/Invoice`)
          
          }
          if(data.message==="Logged in as an admin"){
            setLoader(false)
          setSuccess(true);
          localStorage.setItem('accesstoken', data.accessToken);
          navigate("/AdminDashboard")
        }
      }

        

      }catch(error){
        setLoader(false)
        console.error(error)
        if (error.response && error.response.status === 404) {
          validationErrors.email = "Email doesn't exist";
          setLoader(false)
        }
        setErrors(validationErrors);
        
      }
      };
  return (
    
      
    <form  className="login-form" onSubmit={handleSubmit}>
    <h2>Login</h2>

   

    <div className="form-group">
      <label>Email:</label>
      <input
        type="email"
        name="email"
        onFocus={()=>handleFocus()}
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      {errors.email && <span className="error">{errors.email}</span>}
    </div>

    <div className="form-group">
      <label>Password:</label>
      <input
        type="password"
        name="password"
        onFocus={()=>handleFocus()}
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
      {errors.password && <span className="error">{errors.password}</span>}
    </div>

    <div className="check">
      
      <input
        type="checkbox"
        name="rememberMe"
        onFocus={()=>handleFocus()}
        value={formData.rememberMe}
        onChange={handleChange}
        id='check'
      />
      <label for="check">Stay Signed in</label>
     
    </div>

    

    
   <div className=".form-group">
    <button type="submit" className="form_button" style={{cursor:`${loader? "not-allowed":"pointer"}`}} disabled={loader?true:false}><span>Login</span> {loader && <span><ButtonLoader /></span>}</button>
    <p>Don't have an account?</p>
    </div>
    {success && <p className="success-message">Login successful!</p>}
  </form>
 
  )
}

export default Login