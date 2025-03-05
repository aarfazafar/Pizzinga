import React, {useState} from "react";
import { Link,  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const VITE_BASE_URL =  import.meta.env.MODE === "development"
? import.meta.env.VITE_BASE_URL_DEV
: import.meta.env.VITE_BASE_URL;
const Register = () => {
  const [credentials, setCredentials] = useState({name:'', email:'',password:'', location:''})
  let Navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(`${VITE_BASE_URL}/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: credentials.name, email:credentials.email, location:credentials.location, password:credentials.password})
    })
    const json = await response.json()
    console.log(json);
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      Navigate("/")
      toast.success('Signup successful! Welcome aboard 🎉', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else {
      toast.error('Signup failed. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  }

  const handleOnChange = (event) => {
    setCredentials({...credentials,[event.target.name]: event.target.value})
  }
  return (

    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h3 className="auth-header">Sign Up</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            onChange={handleOnChange}
            required
            name ='name'
            value= {credentials.name}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleOnChange}
            required
            name ='email'
            value= {credentials.email}
          />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            onChange={handleOnChange}
            required
            name ='location'
            value= {credentials.location}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleOnChange}
            required
            name ='password'
            value= {credentials.password}
          />
        </div>

        <div className="d-grid mt-3">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
