import express from "express";
const router = express.Router();
import authMiddleware from "../utils/authMiddleware.js";

import {
  createMovieTable,
  dropMovieTable,
  createMovie,
  getMovies,
  getUserMovies,
  searchMovie,
} from "../services/movie.service.js";

router.post("/createTable", createMovieTable);
router.delete("/dropTable", dropMovieTable);

router.route("/").post(authMiddleware, createMovie).get(getMovies);
router.route("/userMovies").get(authMiddleware, getUserMovies);
router.route("/search").get(searchMovie);

export default router;