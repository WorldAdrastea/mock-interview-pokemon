const express = require('express');
const bodyParser = require('body-parser');
const pokemonRoutes = require('./routes/pokemon');



//Initialize express
const app = express();
const PORT = 8080;

app.use(bodyParser.json());

//Routes
app.use('/pokemon', pokemonRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});