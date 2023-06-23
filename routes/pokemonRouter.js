const router = require("express").Router();
const Pokemon = require('../models/pokemonModel');
const User = require('../models/userModel');
const auth = require("../middlewares/auth")

// Route to create a new Pokemon
router.post('/addpokemon', async (req, res) => {
    const { breed, age, healthStatus } = req.body;

    try {
      const pokemon = new Pokemon({ breed, age, healthStatus });
      await pokemon.save();
  
      res.status(201).json({ message: 'Pokemon created successfully' });
    } catch (err) {
        throw err;

      // res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Route to get available Pokemon for adoption
router.get('/pokemon', async (req, res) => {
    try {
      const availablePokemon = await Pokemon.find({ adoptedBy: null });
      res.json(availablePokemon);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Route to adopt a Pokemon
router.post('/pokemon/:id/adopt',auth, async (req, res) => {
  const pokemonId = req.params.id;
  const userId = req.user.id; // Assuming user authentication middleware is used
  
    try {
    const pokemon = await Pokemon.findById(pokemonId);
    
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    
    if (pokemon.adoptedBy) {
      return res.status(400).json({ message: 'Pokemon already adopted' });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update Pokemon and User records
    pokemon.adoptedBy = user._id;
    user.adoptedPokemon.push(pokemon._id);
    
    await Promise.all([pokemon.save(), user.save()]);
    
    res.json({ message: 'Pokemon adopted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get adopted Pokemon by user
router.get('/:userId/pokemon', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate('adoptedPokemon');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.adoptedPokemon);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to feed the Pokemon
router.post('/pokemon/:pokemonId/feed', async (req, res) => {
  const pokemonId = req.params.pokemonId;

  try {
    const pokemon = await Pokemon.findById(pokemonId);

    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    //check if the pokemon is adopted or not
    if(pokemon.adoptedBy===null){
      return res.status(400).json({ message: "Can't feed the pokemon" });
    }
    // Calculate the time difference since the last feeding
    const currentTime = Date.now();
    const lastFedTime = pokemon.lastFedAt.getTime();
    const timeDifference = currentTime - lastFedTime;
    const hoursSinceLastFed = timeDifference / (1000 * 60 * 60);

    // Check if the Pokemon hasn't been fed for 24 hours
    if (hoursSinceLastFed >= 24) {
      // Decrease the health status of the Pokemon
      pokemon.healthStatus -= 10;

      // Make sure the health status doesn't go below 0
      if (pokemon.healthStatus < 0) {
        pokemon.healthStatus = 0;
      }
    } else {
      // Increase the health status of the Pokemon
      pokemon.healthStatus += 10;

      // Make sure the health status doesn't exceed 100
      if (pokemon.healthStatus > 100) {
        pokemon.healthStatus = 100;
      }
    }

    // Update the last feeding time
    pokemon.lastFedAt = currentTime;

    await pokemon.save();

    res.json({ message: 'Pokemon fed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;