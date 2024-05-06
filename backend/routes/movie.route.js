import express from "express";
const router = express.Router();
import authMiddleware from "../utils/authMiddleware.js";

import {
  createMovie,
  getMovies,
  getUserMovies,
  searchMovie,
} from "../controllers/movie.controller.js";


router.route("/").post(authMiddleware, createMovie).get(getMovies);
router.route("/userMovies").get(authMiddleware, getUserMovies);
router.route("/search").get(searchMovie);

export default router;