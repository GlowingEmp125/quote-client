import { gql, useMutation } from "@apollo/client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const [credential, setCredential] = useState({
    name:"",
    email:"",
    password:""
  })
  interface User{
    createUser:createUser
  }
  interface createUser{
    _id:String,
    name:string,
    eamil:String,
    quote:any[]
  }
let [createUser,{error}] = useMutation<User>(gql`
  mutation Mutation($email: String!, $password: String!,$name:String!) {
  createUser(email: $email, password: $password,name:$name) {
    _id
    name
    email
    quote{
     _id
      by
      name
}
      }
}`,{
 
});
let navigate=useNavigate();
const submitHandle=async(e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  if(credential.name===""||credential.email===""|| credential.password===""){
    alert("Please fill email and password and name field")
    return ;
  }
let {data}=await createUser({
  variables:{
    name:credential.name,
    email:credential.email,
    password:credential.password,
  }
  });
  if(data?.createUser){
    console.log(data?.createUser);
   navigate("/login");
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
    <h1 className='login-heading'>SinUp Form</h1>
      <form action="" onSubmit={submitHandle}>
        <div className='email-container'>
          <label htmlFor="">Name:</label>
          <input type="text" placeholder='Name' value={credential.name} onChange={changeHandle}  name='name'/>
        </div>
        <div className='email-container'>
          <label htmlFor="">Email Address:</label>
          <input type="email" placeholder='Email Address' value={credential.email} onChange={changeHandle}  name='email'/>
        </div>
        <div className='password-container'>
          <label htmlFor="">Password:</label>
          <input type="password" placeholder='Password' value={credential.password} onChange={changeHandle}  name='password'/>
          <p className="account"><Link to={"/login"} className="link">Already have an account? Log In</Link></p>
        <button className="button">Singup </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Signup
