const modifyMovies = (movies: any) => {
    return movies.map((movie: any) => {
        const videoId = movie.video_url.split('/').pop();
        return {
            ...movie,
            video_id: videoId
        };
    });
};

export const fetchMovies = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/movies`);
        const data = await response.json();
        return modifyMovies(data);
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const fetchUserMovies = async (token: any) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/movies/userMovies`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const data = await response.json();
        return modifyMovies(data);
    } catch (error) {
        console.error('Error fetching user movies:', error);
        throw error;
    }
};

export const addMovie = async (
    title: string,
    description: string,
    releaseYear: number,
    imageUrl: string,
    videoUrl: string
) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/movies`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    title,
                    description,
                    release_year: releaseYear,
                    image_url: imageUrl,
                    video_url: videoUrl
                })
            }
        );
        if (response.status === 200) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Error adding movie');
        }
    } catch (error) {
        console.error('Error adding movie:', error);
        throw error;
    }
};

export const fetchSearchData = async (searchMovie: any) => {
    try {
        const url = `${import.meta.env.VITE_BASE_URL}/movies/search?title=${searchMovie}`;
        const response = await fetch(url);
        const data = await response.json();
        return modifyMovies(data)
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteMovie = async (movieId: any) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/movies/movieId/${movieId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        );
        if (response.status === 200) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Error deleting movie');
        }
    } catch (error) {
        console.error('Error deleting movie:', error);
        throw error;
    }
}