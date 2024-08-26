import { Link, useNavigate } from "react-router-dom"
import {useApolloClient} from '@apollo/client'
import { FC, MouseEvent, useState } from "react";
const Navbar:FC = () => {
  let navigate = useNavigate();
  let client=useApolloClient();
   const [toggle, setToggle] = useState(false)
  const logouthandle = async() => {
    await client.clearStore();
    localStorage.removeItem("token");
    navigate("/login")
  }
  const handle=(e:MouseEvent<HTMLDivElement>)=>{
  let target=e.target as HTMLElement;
  if(target.id==="screen"){
    setToggle(false);
  }
  }
  

  return (
    <div>
      <div className="container">
        <div className=''>
          <h2 ><Link to={"/"} className="logo">Quote App</Link></h2>
        </div>
        <div className="menu-item">
          <ul>
            <li className="menu-list"><Link className="item" to={'/home'}>Home</Link></li>
            <li className="menu-list"><Link className="item" to={'/createquote'}>Create Quote</Link></li>
            <li className="menu-list"><Link className="item" to={'/profile'}>Profile</Link></li>
            {!localStorage.getItem("token") ? <>
              <li className="menu-list"><Link className="item" to={'signup'}>SignUp</Link></li>
              <li className="menu-list"><Link className="item" to={'login'}>Login</Link></li></>
              :
              <li className="menu-list" onClick={logouthandle}>LogOut</li>}
          </ul>
        </div>
          <div className="toggle">
            <i className="fas fa-bars" onClick={()=>setToggle(true)}></i>
          </div>
      </div>
    {toggle &&    <div className="mobile-container" onClick={handle}  id="screen">
        <div className="mobile-main-container" id="mobile">
        <h2 ><Link to={"/"} className="logo">Quote App</Link></h2>
          <ul>
          <li className="mobile-menu"><Link onClick={()=>setToggle(false)} className="mobile-item" to={'/home'}>Home</Link></li>
            <li className="mobile-menu"><Link onClick={()=>setToggle(false)} className="mobile-item" to={'/createquote'}>Create Quote</Link></li>
            <li className="mobile-menu"><Link onClick={()=>setToggle(false)} className="mobile-item" to={'/profile'}>Profile</Link></li>
            {!localStorage.getItem("token") ? <>
              <li className="mobile-menu"><Link onClick={()=>setToggle(false)} className="mobile-item" to={'signup'}>SignUp</Link></li>
              <li className="mobile-menu"><Link onClick={()=>setToggle(false)} className="mobile-item" to={'login'}>Login</Link></li></>
              :
              <li className="mobile-menu" style={{cursor:"pointer"}}  onClick={logouthandle}>LogOut</li>}
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default Navbar
