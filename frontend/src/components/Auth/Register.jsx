import React, {useState} from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({name:'', email:'',password:'', location:''})

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: credentials.name, email:credentials.email, location:credentials.location, password:credentials.password})
    })
    const json = await response.json()
    console.log(json);
    // console.log( JSON.stringify({name: credentials.name, email:credentials.email, location:credentials.location, password:credentials.password}))
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
