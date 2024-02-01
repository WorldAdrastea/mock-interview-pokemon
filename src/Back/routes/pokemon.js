import express from 'express';
import axios from 'axios';
import cors from 'cors';

const router = express.Router();


router.use(cors());

router.get('/:name', async (req,res) => {
    const { name } = req.params;

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        const pokemonData = parsePokemonData(response.data);

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

module.exports = router;