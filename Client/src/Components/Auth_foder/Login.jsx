import React,{useState} from 'react'
import './Auth.css'; 
import axios from "axios"


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        account_type:"personal",
        password: '',
       
      });
    
      const [errors, setErrors] = useState({});
      const [success, setSuccess] = useState(false);
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

    axios.defaults.withCredentials=true
      const handleSubmit = async(e) => {
        e.preventDefault();


       try{

        const response= await axios.post("http://localhost:4040/login",{formData})
        // Validation (you can expand this further)
        const validationErrors = {};
        
        if (response.status===401) validationErrors.password = "Email is required";
        if (!formData.email) validationErrors.email = "Email is required";
        if (!formData.password) validationErrors.password = "Password is required";
       
    
        setErrors(validationErrors);
    
        // If there are no validation errors, show success message
        if (Object.keys(validationErrors).length === 0) {
          setSuccess(true);
        }

      }catch(error){
        console.error(error)
      }
      };
  return (
    <div className="container">
    <form className="login-form" onSubmit={handleSubmit}>
    <h2>Login</h2>

   

    <div className="form-group">
      <label>Email:</label>
      <input
        type="email"
        name="email"
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
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
      {errors.password && <span className="error">{errors.password}</span>}
    </div>

    
   <div className=".form-group">
    <button type="submit" className="form_button">Login</button>
    </div>
    {success && <p className="success-message">Login successful!</p>}
  </form>
  </div>
  )
}

export default Login