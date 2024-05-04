import Sequelize from 'sequelize';
import Review from "../models/review.model.js";
import Movie from "../models/movie.model.js";
import User from "../models/user.model.js";

const createReviewTable = async (req, res) => {
    try {
        await Review.sync({ force: false });
        res.status(200).json({ msg: 'Review table created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const dropReviewTable = async (req, res) => {
    try {
        await Review.drop();
        res.status(200).json({ msg: 'Review table dropped successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const createReview = async (req, res) => {
    try {
        const review = await Review.create({
            ...req.body,
            user_id: req.userId
        });
        await Movie.increment('rating', { by: 1, where: { _id: review.movie_id } });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getMovieReviews = async (req, res) => {
    const movieId = req.params.id;
    try {
        const reviews = await Review.findAll({ where: { movie_id: movieId } });
        const reviewsWithUser = await Promise.all(reviews.map(async (review) => {
            const user = await User.findByPk(review.user_id);
            return {
                ...review.toJSON(),
                user
            };
        }));
        res.status(200).json(reviewsWithUser);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}


const getUserReviews = async (req, res) => {
    const userId = req.userId;
    try {
        const reviews = await Review.findAll({ where: { user_id: userId } });
        const reviewsWithMovie = await Promise.all(reviews.map(async (review) => {
            const movie = await Movie.findByPk(review.movie_id);
            return {
                ...review.toJSON(),
                movie
            };
        }));
        res.status(200).json(reviewsWithMovie);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const updateReview = async (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    try {
        const [updatedRows] = await Review.update({ review: description }, { where: { _id: id } });
        if (updatedRows === 0) {
            res.status(404).json({ error: 'Review not found' });
            return;
        }
        res.status(200).json({ msg: `Updated successfully` });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const deleteReview = async (req, res) => {
    const id = req.params.id;
    try {
        const review = await Review.findByPk(id);
        if (!review) {
            res.status(404).json({ error: 'Review not found' });
            return;
        }
        await review.destroy();
        await Movie.decrement('rating', { by: 1, where: { _id: review.movie_id } });
        res.status(200).json({ msg: `${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

export{
    createReviewTable,
    dropReviewTable,
    createReview,
    getMovieReviews,
    getUserReviews,
    updateReview,
    deleteReview
}