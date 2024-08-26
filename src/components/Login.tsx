import { gql, useMutation } from "@apollo/client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [credential, setCredential] = useState({
    email:"",
    password:""
  })
  interface login{
    loginUser:loginUser,
    }
    interface loginUser{
      token:String
    }
    
let [loginUser,{error}] = useMutation<login>(gql`
  mutation Mutation($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
  }
}`,{
 
});
let navigate=useNavigate();
const submitHandle=async(e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  if(credential.email===""|| credential.password===""){
    alert("Please fill email and password field")
    return;
  }
let {data}=await loginUser({
  variables:{
    email:credential.email,
    password:credential.password,
  }
  });
  
  if(data?.loginUser.token){
    let token=data.loginUser.token;
    localStorage.setItem("token",JSON.stringify(token));
   navigate("/");
  }
  
}

useEffect(()=>{
if(error?.message){
  alert(error.message)
}
},[error])
 
const changeHandle=(e:ChangeEvent<HTMLInputElement>)=>{
  setCredential({...credential,[e.target.name]:e.target.value});
}
  
  return (
    <div className="login-container">
    <div className="main-container">
    <h1 className='login-heading'>Login Form</h1>
      <form action="" onSubmit={submitHandle}>
        <div className='email-container'>
          <label htmlFor="">Email Address:</label>
          <input type="email" placeholder='Email Address' value={credential.email} onChange={changeHandle}  name='email'/>
        </div>
        <div className='password-container'>
          <label htmlFor="">Password:</label>
          <input type="password" placeholder='Password' value={credential.password} onChange={changeHandle}  name='password'/>
          <p className="account"><Link to={"/signup"} className="link">New here? Sign Up</Link></p>
        <button className="button">Login </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login
