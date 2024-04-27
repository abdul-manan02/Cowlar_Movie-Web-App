import UserModel from '../models/user.model.js';
import MovieModel from '../models/movie.model.js';
import ReviewModel from '../models/review.model.js';
const userModel = new UserModel();
const movieModel = new MovieModel();
const reviewModel = new ReviewModel();

const createReviewTable = async (req, res) => {
    try {
        await reviewModel.createTable();
        res.status(200).json({ msg: 'Review table created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const dropReviewTable = async (req, res) => {
    try {
        await reviewModel.dropTable();
        res.status(200).json({ msg: 'Review table dropped successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.findAll();
        
        const reviewsWithMovieAndUser = await Promise.all(reviews.map(async (review) => {
            const movie = await movieModel.findById(review.movie_id);
            const user = await userModel.findById(review.user_id);
            
            return {
                ...review,
                movie,
                user
            };
        }));
        
        res.status(200).json(reviewsWithMovieAndUser);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const createReview = async (req, res) => {
    try {
        const [review] = await Promise.all([
            reviewModel.create(req.body),
            movieModel.incrementRating(req.body.movie_id)
        ]);

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getReview = async (req, res) => {
    const id = req.params.id;
    try {
        const review = await reviewModel.findById(id);
        
        if (!review)
            res.status(404).json({ error: 'Review not found' });
        else 
            res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const deleteReview = async (req, res) => {
    const id = req.params.id;
    try {
        const review = await reviewModel.findById(id);
        const [deletedRows] = await Promise.all([
            reviewModel.delete(id),
            movieModel.decrementRating(review.movie_id)
        ]);
        
        if (deletedRows === 0)
            res.status(404).json({ error: 'Review not found' });
        else 
            res.status(200).json({msg : `${id} deleted successfully`});
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

export{
    createReviewTable,
    dropReviewTable,
    getReviews,
    createReview,
    getReview,
    deleteReview
}