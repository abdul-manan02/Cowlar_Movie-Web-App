import express from 'express';
const router = express.Router();

import{
    createMovieTable,
    dropMovieTable,
    getMovies,
    createMovies,
    getMovie,
    deleteMovie
} from '../controllers/movie.controller.js';

router.post('/createTable', createMovieTable);
router.delete('/dropTable', dropMovieTable);

router.route('/').get(getMovies).post(createMovies);

router.route('/movieId/:id')
    .get(getMovie)
    .delete(deleteMovie);

export default router