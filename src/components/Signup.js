import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {

  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
  let history = useHistory();
 

  const handleSubmit = async (e)=>{

    e.preventDefault();
    const {name,email,password}=credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser",{
        
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          },
          body: JSON.stringify({name,email,password})
      });
      const json = await response.json()
      console.log(json);
      if(json.success)
      {
        //Save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        history.push("/")
        props.showAlert("Account created successfully","success")
      }
      else{
        props.showAlert("Invalid credentials","danger")
      }

    }
    
    const onChange = (e)=>{
    
      setCredentials({...credentials , [e.target.name]:e.target.value})
  }
  return (
    <div>

      <form onSubmit={handleSubmit}>
      <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            minLength={5} required
            class="form-control"
            onChange={onChange}
            id="password"
          />
        </div>
        <div class="mb-3">
          <label for="cpassword" class="form-label">
           Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            onChange={onChange}
            id="cpassword"
            name="cpassword"
          />
        </div>       
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup;
