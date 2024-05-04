export const fetchUserReviews = async (token: any) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/reviews/userReviews`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching user reviews:', error);
        throw error;
    }
};

export const fetchReviewsForMovie = async (movieId: any, token: any) => {
    const url = `${import.meta.env.VITE_BASE_URL}/reviews/movieId/${movieId}`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        method: 'GET'
    });
    const result = await response.json();
    return result;
};

export const addReviewForMovie = async (movieId: any, newReview: any, token: any) => {
    const url = `${import.meta.env.VITE_BASE_URL}/reviews`;
    const data = {
        movie_id: movieId,
        rating: 3,
        review: newReview
    };
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify(data)
    });
    if (response.status === 200) {
        return true;
    } else {
        throw new Error('Failed to add review');
    }
};

export const editReview = async (reviewId: string, description: string, token: string) => {
    const url = `${import.meta.env.VITE_BASE_URL}/reviews/reviewId/${reviewId}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
            description
        })
    });
    if (response.status === 200) {
        return true;
    } else {
        throw new Error('Error editing review');
    }
};

export const deleteReview = async (reviewId: string, token: string) => {
    const url = `${import.meta.env.VITE_BASE_URL}/reviews/reviewId/${reviewId}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    });
    if (response.status === 200) {
        return true;
    } else {
        throw new Error('Error deleting review');
    }
};