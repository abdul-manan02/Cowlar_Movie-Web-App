import Review from "../models/review.model.js";
import Movie from "../models/movie.model.js";
import User from "../models/user.model.js";

const createReviewHandler = async (reviewData, userId) => {
  try {
    const review = await Review.create({
      ...reviewData,
      user_id: userId,
    });
    await Movie.increment("rating", { by: 1, where: { _id: review.movie_id } });
    return review;
  } catch (error) {
    throw error;
  }
};

const getMovieReviewsHandler = async (movieId) => {
  try {
    const reviews = await Review.findAll({ where: { movie_id: movieId } });
    const reviewsWithUser = await Promise.all(
      reviews.map(async (review) => {
        const user = await User.findByPk(review.user_id);
        return {
          ...review.toJSON(),
          user,
        };
      })
    );
    return reviewsWithUser;
  } catch (error) {
    throw error;
  }
};

const getUserReviewsHandler = async (userId) => {
  try {
    const reviews = await Review.findAll({ where: { user_id: userId } });
    const reviewsWithMovie = await Promise.all(
      reviews.map(async (review) => {
        const movie = await Movie.findByPk(review.movie_id);
        return {
          ...review.toJSON(),
          movie,
        };
      })
    );
    return reviewsWithMovie;
  } catch (error) {
    throw error;
  }
};

const updateReviewHandler = async (id, description) => {
  try {
    const [updatedRows] = await Review.update(
      { review: description },
      { where: { _id: id } }
    );
    if (updatedRows === 0) {
      throw new Error("Review not found");
    }
    return { msg: `Updated successfully` };
  } catch (error) {
    throw error;
  }
};

const deleteReviewHandler = async (id) => {
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error("Review not found");
    }
    await review.destroy();
    await Movie.decrement("rating", { by: 1, where: { _id: review.movie_id } });
    return { msg: `${id} deleted successfully` };
  } catch (error) {
    throw error;
  }
};

export {
  createReviewHandler,
  getMovieReviewsHandler,
  getUserReviewsHandler,
  updateReviewHandler,
  deleteReviewHandler,
};
