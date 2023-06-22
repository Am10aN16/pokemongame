import React, { useContext } from 'react'
import Pokeball from "./images/pokeball.png"
import axios from 'axios'
import { GlobalState } from '../../GlobalState'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const PokeCard = ({pokemon}) => {
  const state = useContext(GlobalState);
  const[id] = state.userAPI.id
  const [token] = state.token
  const navigate = useNavigate()

const adoptedPokemon= async(id)=>{
  try {
    if(token){
      await axios.post(`/api/pokemon/${pokemon._id}/adopt`, {id},
      {
       headers: {Authorization : token}
    });
    Swal.fire({
      imageUrl: {Pokeball},
      imageHeight: 200,
      imageAlt: 'A tall image'
    })
      console.log("adopted");
    }else{
      Swal.fire(
        'Want to Adopt?',
        'Login first to Adopt',
        'question'
      )
      navigate("/login");
    }
  
  } catch (error) {
    throw error;
  }

}
   
  

  return (
    <>
    <div className="card">
    <div className="icon">
      <img className='icon' src={Pokeball} alt='logo' ></img>
    </div>
    <div className="content">
      <h2 style={{textTransform:"uppercase"}}>{pokemon.breed}</h2>
      <p>Health:<span>{pokemon.healthStatus}</span></p>
      <p>Age:<span>{pokemon.age}</span></p>
      <p >Welcome to the Pokemon's World my name is <span style={{
        textTransform:"uppercase",color:"#ff0101"
      }}>{pokemon.breed}</span></p>
      <button onClick={adoptedPokemon} className='btn'>Adopt Me</button>
    </div>
  </div>
</>
  )
}

export default PokeCard