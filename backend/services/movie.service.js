import Sequelize from 'sequelize';
import Movie from "../models/movie.model.js";

const createMovieTable = async (req, res) => {
  try {
    await Movie.sync({ force: false });
    res.status(200).json({ msg: "Movie table created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const dropMovieTable = async (req, res) => {
  try {
    await Movie.drop();
    res.status(200).json({ msg: "Movie table dropped successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const createMovie = async (req, res) => {
  const modifiedBody = {
    ...req.body,
    user_id: req.userId,
  };
  try {
    const movie = await Movie.create(modifiedBody);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getMovies = async (req, res) => {
  let sortBy;
  if (req.query.sortBy === "latest" || req.query.sortBy === "rating") {
    sortBy = req.query.sortBy;
  }
  try {
    let options = {};
    if (sortBy === "latest") {
      options.order = [["createdAt", "DESC"]];
    } else if (sortBy === "rating") {
      options.order = [["rating", "DESC"]];
    }
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getUserMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      where: { user_id: req.userId },
    });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const searchMovie = async (req, res) => {
  const title = req.query.title;

  try {
    const movies = await Movie.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: `%${title}%`,
        },
      },
    });

    if (movies.length === 0) res.status(404).json({ error: "Movie not found" });
    else res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export {
  createMovieTable,
  dropMovieTable,
  createMovie,
  getMovies,
  getUserMovies,
  searchMovie,
};
