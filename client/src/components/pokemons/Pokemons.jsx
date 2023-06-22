import React , {useContext, useEffect, useState} from 'react'
import { GlobalState } from '../../GlobalState'
import PokeCard from "./PokeCard"
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../mainpages/Footer';

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
   

    const creature = async()=>{
        try {
            const response = await axios.get('/api/pokemon');
            setPokemons(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        creature();
    },[])

  return (
    <>
    <div className='products'>

    {
      pokemons.map(pokemon => {
        return <PokeCard key={pokemon._id} pokemon={pokemon} 
          isAdmin = {isAdmin} />
      })
    }
  
    </div>
    <Footer/>
    </>
  )
}

export default Pokemons