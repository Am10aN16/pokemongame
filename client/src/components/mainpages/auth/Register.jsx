import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Footer from '../Footer';

const Register = () => {

  const [user,setUser]= useState({
   name:'', email:'', password:''
  })

  const navigate = useNavigate()

  const onChangeInput = e =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }


  const registerSubmit = async e =>{
    e.preventDefault()

    try {
      await axios.post('/user/register',{...user})
      Swal.fire(
        'Good job!',
        'You are Registered',
        'success'
      )
      // localStorage.setItem('firstLogin', true)
      navigate("/login");
      // window.location.href = "/login";


    } catch (err) {
      // alert(err.response.data.msg)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.msg}`,
      
      })
    }
  }

  return (
    <>
    <div className='login-page'>
    <form onSubmit={registerSubmit}>
    <h2>Register</h2>
    <input type="text" name="name" required
      placeholder="Name" value={user.name} onChange={onChangeInput}/>

      <input type="email" name="email" required
      placeholder="Email" value={user.email} onChange={onChangeInput}/>
      
      <input type="password" name="password" required autoComplete='on'
      placeholder="Password" value={user.password} onChange={onChangeInput} />

    <div className="row">
      <button type='submit'>Register</button>
      <NavLink to='/login'>Login</NavLink>
    </div>

    </form>
    <ToastContainer/>
    </div>
    <Footer/>
    </>
  )
}

export default Register