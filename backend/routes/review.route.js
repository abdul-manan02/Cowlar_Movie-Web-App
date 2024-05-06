import express from "express";
const router = express.Router();
import authMiddleware from "../utils/authMiddleware.js";

import {
  createReview,
  getMovieReviews,
  getUserReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

router.route("/").post(authMiddleware, createReview);
router.route("/movieId/:id").get(getMovieReviews);

router.get("/userReviews", authMiddleware, getUserReviews);

router
  .route("/reviewId/:id")
  .put(authMiddleware, updateReview)
  .delete(authMiddleware, deleteReview);

export default router;
