import express from 'express';
const router = express.Router();
import authMiddleware from '../utils/authMiddleware.js'

import{
    createReviewTable,
    dropReviewTable,
    getReviews,
    createReview,
    getReview,
    deleteReview,
    getMovieReviews,
    getReviewsForUser
} from '../controllers/review.controller.js';

router.post('/createTable', createReviewTable);
router.delete('/dropTable', dropReviewTable);

router.route('/').get(getReviews).post(authMiddleware, createReview);
router.route('/movieId/:id').get(getMovieReviews)

router.route('/userReviews').get(authMiddleware, getReviewsForUser);

router.route('/reviewId/:id')
    .get(getReview)
    .delete(authMiddleware, deleteReview);

export default router