import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Pokeball from "./images/pokeball.png"
import axios from 'axios'
import Swal from 'sweetalert2'
import Footer from '../mainpages/Footer'

const AdoptedPokemon = () => {
    const[myPokemon,setMyPokemon] = useState([]);
    const state = useContext(GlobalState)
    const[id] =  state.userAPI.id;
    
  

      const myPokemons = async() =>{
        try {
           
            const response = await axios.get(`/api/${id}/pokemon`);
            console.log(response.data);
                 setMyPokemon(response.data);
            
        } catch (error) {
            console.log(error.message);
        }
      
    }

    useEffect(()=>{
        myPokemons(); 
},[])

const feedPokemon = async(pokeId)=>{

try {
    await axios.post(`/api/pokemon/${pokeId}/feed`);
    Swal.fire({
      imageUrl:` ${Pokeball}`,
      imageHeight: 200,
      imageAlt: 'Pokemon',
      text:'Feeded the Pokemon'
    })
// alert("Feeded the pokemon");
} catch (error) {
    throw error;
}
}

  return (
    <div className='products'>
        {
       myPokemon.map(pokemon => {
        return (   
 <div className="card" key={pokemon._id} >
    <div className="icon">
      <img className='icon' src={Pokeball} alt='logo' ></img>
    </div>
    <div className="content">
      <h2 style={{textTransform:"uppercase"}}>{pokemon.breed}</h2>
      <p>Health:<span>{pokemon.healthStatus}</span></p>
      <p>Age:<span>{pokemon.age}</span></p>
      <p >I am there to fight for you!!. My name is <span style={{
        textTransform:"uppercase",color:"#ff0101"
      }}>{pokemon.breed}</span> </p>
      <button className='btn' onClick={()=>feedPokemon(pokemon._id)}>Feed Me</button>
    </div>
  </div>
        
        )
      })
    }
    <Footer/>
    </div>
  )
}

export default AdoptedPokemon