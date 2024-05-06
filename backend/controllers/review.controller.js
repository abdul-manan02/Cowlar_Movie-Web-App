import {
  createReviewHandler,
  getMovieReviewsHandler,
  getUserReviewsHandler,
  updateReviewHandler,
  deleteReviewHandler,
} from "../services/review.service.js";

const createReview = async (req, res) => {
  try {
    const review = await createReviewHandler(req.body, req.userId);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getMovieReviews = async (req, res) => {
  const movieId = req.params.id;
  try {
    const reviewsWithUser = await getMovieReviewsHandler(movieId);
    res.status(200).json(reviewsWithUser);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getUserReviews = async (req, res) => {
  const userId = req.userId;
  try {
    const reviewsWithMovie = await getUserReviewsHandler(userId);
    res.status(200).json(reviewsWithMovie);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const updateReview = async (req, res) => {
  try {
    const result = await updateReviewHandler(
      req.params.id,
      req.body.description
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteReview = async (req, res) => {
  try {
    const result = await deleteReviewHandler(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export {
  createReview,
  getMovieReviews,
  getUserReviews,
  updateReview,
  deleteReview,
};
