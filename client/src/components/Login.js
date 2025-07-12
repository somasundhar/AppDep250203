import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
 
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch()
 


   let onLogIn = async()=>{
    let dataToSend = new FormData();
   
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    
  
    
   
    let reqOptions = {
      method:"POST",
      body:dataToSend,
      
    };

    let JSONData = await fetch("http://localhost:3333/login",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
    if(JSOData.status === "Success"){
      dispatch({type:"login",data:JSOData.data})
       navigate("/dashboard")
    }
  }
  return (
    <div className="App">
     
      <form>
         <h1>Login</h1>
       
         
         <div>
          <label>Email</label>
          <input type="email" ref={emailInputRef}></input>
        </div>
         <div>
          <label>Password</label>
          <input  ref={passwordInputRef}></input>
        </div>
         <div>
          <button type='button' onClick={()=>{
            onLogIn();
          }}>login</button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to={'/signup'}>Signup</Link>
     {/* <Link to={"/signup"}>Signup</Link>       */}
    </div>
  );
}

export default Login;