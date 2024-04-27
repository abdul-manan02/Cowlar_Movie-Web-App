import express from 'express';
const router = express.Router();

import{
    createReviewTable,
    dropReviewTable,
    getReviews,
    createReview,
    getReview,
    deleteReview
} from '../controllers/review.controller.js';

router.post('/createTable', createReviewTable);
router.delete('/dropTable', dropReviewTable);

router.route('/').get(getReviews).post(createReview);

router.route('/reviewId/:id')
    .get(getReview)
    .delete(deleteReview);

export default router