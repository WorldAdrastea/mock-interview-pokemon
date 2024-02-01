import express from 'express';
import bodyParser from 'body-parser';
import pokemonRoutes from './routes/pokemon';



//Initialize express
const app = express();
const PORT = 8080;

app.use(bodyParser.json());

//Routes
app.use('/pokemon', pokemonRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});

module.exports = app;