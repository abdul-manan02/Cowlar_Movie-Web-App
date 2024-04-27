import MovieModel from '../models/movie.model.js';
const movieModel = new MovieModel();

const createMovieTable = async (req, res) => {
    try {
        await movieModel.createTable();
        res.status(200).json({ msg: 'Movie table created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const dropMovieTable = async (req, res) => {
    try {
        await movieModel.dropTable();
        res.status(200).json({ msg: 'Movie table dropped successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const getMovies = async (req, res) => {
    try {
        const movies = await movieModel.findAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
  
const createMovies = async (req, res) => {
    try {
        const movieTitle = await movieModel.create(req.body);  
        res.status(200).json(movieTitle);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await movieModel.findById(id);
        
        if (!movie)
            res.status(404).json({ error: 'Movie not found' });
        else 
            res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const deleteMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedRows = await movieModel.delete(id);

        if (deletedRows === 0)
            res.status(404).json({ error: 'Movie not found' });
        else 
            res.status(200).json({msg : `${id} deleted successfully`});
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

export{
    createMovieTable,
    dropMovieTable,
    getMovies,
    createMovies,
    getMovie,
    deleteMovie
}