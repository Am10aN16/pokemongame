import React,{useContext, useState} from 'react';
import {GlobalState} from "../../GlobalState";
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import {NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Pokeball from '../pokemons/images/pokeball.png'

const Header = () => {
    
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
   
    const [menu , setMenu] = useState(false)
  const navigate = useNavigate()

    const logoutUser = async() =>{
      Swal.fire(
        'see you soon!',
        'You logged out',
        'success'
      )
          await axios.get('/user/logout')
          localStorage.removeItem('firstLogin')
     
        window.location.href = "/";
        
        // await axios.get('/user/logout')
  
        // localStorage.removeItem('firstLogin')
        
      //  window.location.href = "/";
  
       
      }

      const toNewPage= async()=>{
        await navigate("/mypokemons") ;
      }

      const adminRouter = () => {
        return(
          <>
            <li onClick={()=> setMenu(!menu)}><NavLink to = '/create_product'>Create Pokemon</NavLink></li>
            <li onClick={()=> setMenu(!menu)}><NavLink to = '/category'>Delete </NavLink></li>
          </>
        )
      }

      const loggedRouter = () => {
        return(
          <>
            <li onClick={()=> setMenu(!menu)}><a onClick={toNewPage}>My Pokemons</a></li>
            <li onClick={()=> setMenu(!menu)}><NavLink to = '/' onClick={logoutUser} >LogOut</NavLink></li>
          </>
        )
      }

      const styleMenu = {
        left : menu ? 0 : "-100%"
      }

  return (
    <header>
    
    <div className='menu' onClick={()=> setMenu(!menu)}>
        <img src = {Menu} alt="" width="45" style={{marginLeft:"10px",backgroundColor:"#bfbfbf",padding:"12px",borderRadius:"5px"}} />
    </div>

    <div className='logo'>
    <img src={Pokeball} alt="" srcset="" id="logoimg" style={{height:'50px',width:'50px'}} />
      <h1>
      <NavLink to= '/'>{isAdmin ? 'Admin' : 'Pokemon Pals'}</NavLink>
      </h1>
      
    </div>

    <ul style={styleMenu}>
      <li onClick={()=> setMenu(!menu)}><NavLink to = "/pokemons">{isAdmin ? 'Pokemons ' : 'Adopt'}</NavLink></li>

    {isAdmin && adminRouter()}
    {
      isLogged ? loggedRouter() : <li onClick={()=> setMenu(!menu)}><NavLink to = "/login">Login * Register</NavLink></li>
    }

      <li onClick={()=> setMenu(!menu)}>
        <img src={Close} alt="" width="30" className='menu'/>
      </li>
    </ul>


  
    </header>
  )
}

export default Header