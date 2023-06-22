import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Footer from '../Footer';

const Login = () => {

  const [user,setUser]= useState({
    email:'', password:''
  })


  const onChangeInput = e =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }

  
  const loginSubmit = async e =>{
    e.preventDefault()

    try {
  
      await axios.post('/user/login',{...user})

      localStorage.setItem('firstLogin', true)
      
      Swal.fire(
        'Good job!',
        'You just Logged in',
        'success'
      )
      window.location.href = "/";


    } catch (err) {
    
      if(err.response.status===400 || err.response.status===500){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.msg}`,
          
        })
      }
    }
  }

  return (
    <>
    <div className='login-page'>
    <h2>Login</h2>
    <form onSubmit={loginSubmit}>
      <input type="email" name="email" required
      placeholder="Email" value={user.email} onChange={onChangeInput}/>
      
      <input type="password" name="password" required autoComplete='on'
      placeholder="Password" value={user.password} onChange={onChangeInput} />

    <div className="row">
      <button type='submit' >Login</button>
      <NavLink to='/register'>Register</NavLink>
    </div>

    </form>
    <ToastContainer/>
    
    </div>
    <Footer/>
    </>
  )
  }

export default Login