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

const getReviewsForUser = async (req, res) => {
    const userId = req.userId;
    try {
        const reviews = await reviewModel.getUserReviews(userId);
        if(reviews.length === 0){
            res.status(404).json({ error: 'No reviews found' });
            return;
        }
        const reviewsWithMovie = await Promise.all(reviews.map(async (review) => {
            const movie = await movieModel.findById(review.movie_id);
            return {
                ...review,
                movie
            };
        }
        ));
        res.status(200).json(reviewsWithMovie);
    }
    catch (error) {
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
        const review = await reviewModel.create(req.body, req.userId);
        await movieModel.incrementRating(req.body.movie_id);

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getMovieReviews = async (req, res) => {
    const movieId = req.params.id;
    try {
        const reviews = await reviewModel.findByMovieId(movieId);
        if(reviews.length === 0){
            res.status(404).json({ error: 'No reviews found' });
            return;
        }
        const reviewsWithUser = await Promise.all(reviews.map(async (review) => {
            const user = await userModel.findById(review.user_id);
            return {
                ...review,
                user
            };
        }
        ));
        res.status(200).json(reviewsWithUser);
    }
    catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}
        
const getReview = async (req, res) => {
    const id = req.params.id;
    try {
        const review = await reviewModel.findById(id);
        
        if (!review) {
            res.status(404).json({ error: 'Review not found' });
            return;
        }

        const movie = await movieModel.findById(review.movie_id);
        const user = await userModel.findById(review.user_id);

        if (!movie || !user) {
            res.status(404).json({ error: 'Associated movie or user not found' });
            return;
        }

        res.status(200).json({
            ...review,
            movie,
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const deleteReview = async (req, res) => {
    const id = req.params.id;
    try {
        const review = await reviewModel.findById(id);
        const deletedRows = await reviewModel.delete(id);
        await movieModel.decrementRating(review.movie_id);
        
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
    deleteReview,
    getMovieReviews,
    getReviewsForUser
}