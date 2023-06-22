const mongoose = require("mongoose")

const pokemonSchema = new mongoose.Schema({
    breed:{
        type: String,
        trim: true,
        unique:true,
        required:true
    },
    healthStatus: {
         type: Number, 
         default: 100 
        },
    age:{
        type: Number,
        default: 0
    },
    adoptedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users',
     default: null 
    },
    lastFedAt: { 
        type: Date,
         default: Date.now 
        },
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;