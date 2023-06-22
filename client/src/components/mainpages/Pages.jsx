import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import Pokemon from '../pokemons/Pokemons'
import Login from './auth/Login'
import Register from './auth/Register'
import Adopted from '../pokemons/AdoptedPokemon'
import NotFound from '../Notfound'
import HomePage from '../mainpages/Homepage'


import {GlobalState} from '../../GlobalState'

const Pages = () => {

  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
//   const [isAdmin] = state.userAPI.isAdmin

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
    <Route path='/pokemons' element={<Pokemon/>}/>
    {/* <Route path='/detail/:id' element={<DetailProduct/>}/> */}

    <Route path='/login' element={isLogged ? NotFound :<Login/>}/>
    <Route path='/register' element={isLogged ? NotFound :<Register/>}/>
    <Route path='/mypokemons' element={ <Adopted/>}/>
   <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default Pages