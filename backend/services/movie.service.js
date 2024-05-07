import Movie from "../models/movie.model.js";
import Review from "../models/review.model.js";
import Sequelize from "sequelize";

const createMovieHandler = async (movieData, userId) => {
  try {
    const modifiedMovieData = {
      ...movieData,
      user_id: userId,
    };
    const movie = await Movie.create(modifiedMovieData);
    return movie;
  } catch (error) {
    throw error;
  }
};

const getMoviesHandler = async (sortBy) => {
  try {
    let options = {};
    if (sortBy === "latest") {
      options.order = [["createdAt", "DESC"]];
    } else if (sortBy === "rating") {
      options.order = [["rating", "DESC"]];
    }
    const movies = await Movie.findAll(options);
    return movies;
  } catch (error) {
    throw error;
  }
};

const getUserMoviesHandler = async (userId) => {
  try {
    const movies = await Movie.findAll({
      where: { user_id: userId },
    });
    return movies;
  } catch (error) {
    throw error;
  }
};

const searchMovieHandler = async (title) => {
  try {
    const movies = await Movie.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: `%${title}%`,
        },
      },
    });
    return movies;
  } catch (error) {
    throw error;
  }
};

const deleteMovieHandler = async (movieId) => {
  try {
    console.log('CA A L L E D', movieId)
    await Review.destroy({
      where: { movie_id: movieId },
    });
    const result = await Movie.destroy({
      where: {
        _id: movieId,
      },
      cascade: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export {
  createMovieHandler,
  getMoviesHandler,
  getUserMoviesHandler,
  searchMovieHandler,
  deleteMovieHandler,
};
