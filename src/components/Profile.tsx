import { gql ,useQuery } from "@apollo/client"
import { ChangeEvent, useEffect, useState } from "react"

const Profile = () => {
  const [credential, setCredential] = useState({
    name:"",
    email:"",
  })
  interface User{
    user:[createUser]
  }
  interface createUser{
    _id:string,
    name:string,
    email:string,
    quote:any[]
  }
let {data} = useQuery<User>(gql`
query Query {
  user {
    _id
    email
    name
    quote {
      _id
      by
      name
    }
  }
} 
`,{
 
});
const changeHandle=(e:ChangeEvent<HTMLInputElement>)=>{
  setCredential({...credential,[e.target.name]:e.target.value});
}

useEffect(()=>{
    if(data?.user){
     setCredential({
        email:data.user[0].email,
        name:data.user[0].name
     })      
    }
},[data])

  return (
    <div className="login-container">
   {localStorage.getItem("token")? <div className="main-container">
    <h1 className='login-heading'>Profile</h1>
      <form action="" >
    
      <div className='email-container'>
    <img src={`https://robohash.org/${credential.name}`} alt="" className="profile" />
          <label htmlFor="">Name:</label>
          <input type="text" placeholder='Name' value={credential.name} onChange={changeHandle}  name='name'/>
        </div>
        <div className='email-container'>
          <label htmlFor="">Email Address:</label>
          <input type="email" placeholder='Email Address'  value={credential.email} onChange={changeHandle}  name='email'/>
        </div>
      </form>
    </div>:<h2 className="heading">Login To access Your Profile</h2>}
    </div>
  )
}

export default Profile
