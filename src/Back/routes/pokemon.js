import express from 'express';
import axios from 'axios';
import cors from 'cors';

const router = express.Router();

router.use(cors());

// Express route that handles GET request to end point "/pokemon/:name"
router.get('/:name', async (req,res) => {
    //Extracts the name paramenter from request parameters
    const { name } = req.params;

    try {
        //Makes async request to PokeAPI to fetch info about specified pokemon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        const pokemonData = parsePokemonData(response.data);
        //After parsing pokemon data to have name, description and is_legendary, sends JSON response with the parsed pokemon data 
        res.json(pokemonData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Helper to parse pokemon data
function parsePokemonData(data) {
    return {
        name: data.name,
        description: data.flavor_text_entries[0].flavor_text,
        is_legendary: data.is_legendary,
    };
}

export default router;