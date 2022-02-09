import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {

  const [credentials,setCredentials]=useState({email:"",password:""})
  let history = useHistory();
 

  const handleSubmit= async (e)=>{
    e.preventDefault();
   
      const response = await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          },
          body: JSON.stringify({email:credentials.email, password:credentials.password})
      });
      const json = await response.json()
      console.log(json)
      if(json.success)
      {
        //Save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        history.push("/");
        props.showAlert("Logged in successfully","success")
      }
      else{
        props.showAlert("Invalid details","danger")

      }

    }
    
    const onChange = (e)=>{
    
      setCredentials({...credentials , [e.target.name]:e.target.value})
  }
  
  return (
 
    <div className="mt-5">
      <h2 className="my-2">Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-4" >
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary" >

          Submit
        </button>
      </form>
    </div>
  
  )
}

export default Login;
