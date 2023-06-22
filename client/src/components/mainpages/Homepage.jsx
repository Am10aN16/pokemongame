import React from 'react'
import Ash from '../pokemons/images/homepage.png'
import Footer from './Footer'

const Homepage = () => {
  return (
    <>
    <div className='homepage'>
        <div className="left">
            <h1>Welcome to the Pokemon World</h1>
            <p className='content'>Welcome to the world of Pokémon, where adventure awaits!

    <br/>Unleash your inner trainer and embark on an epic journey to become a Pokémon Master.

    <br/>Catch, train, unique Pokémon species, each with their own abilities and strengths.

    <br/>Get ready to capture rare Pokémon, evolve them, and create an unbeatable team.

    <br/>Are you ready to make your mark in the Pokémon world? The adventure starts here!</p>
        </div>
        <div className="right">
            <img src={Ash} alt="" srcset="" style={{height:'500px'}} />
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Homepage