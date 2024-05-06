import {
  createMovieHandler,
  getMoviesHandler,
  getUserMoviesHandler,
  searchMovieHandler,
} from "../services/movie.service.js";

const createMovie = async (req, res) => {
  try {
    const movie = await createMovieHandler(req.body, req.userId);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await getMoviesHandler(req.query.sortBy);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getUserMovies = async (req, res) => {
  try {
    const movies = await getUserMoviesHandler(req.userId);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const searchMovie = async (req, res) => {
  try {
    const movies = await searchMovieHandler(req.query.title);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export { createMovie, getMovies, getUserMovies, searchMovie };
