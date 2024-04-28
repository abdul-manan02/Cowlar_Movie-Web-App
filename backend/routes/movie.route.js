import express from 'express';
const router = express.Router();
import authMiddleware from '../utils/authMiddleware.js'

import{
    createMovieTable,
    dropMovieTable,
    getMovies,
    getMoviesForUser,
    createMovies,
    getMovie,
    deleteMovie
} from '../controllers/movie.controller.js';

router.post('/createTable', createMovieTable);
router.delete('/dropTable', dropMovieTable);

router.route('/').post(authMiddleware, createMovies).get(getMovies);

router.route('/movieId/:id')
    .get(getMovie)
    .delete(authMiddleware, deleteMovie);

router.route('/userMovies').get(authMiddleware, getMoviesForUser);

export default router