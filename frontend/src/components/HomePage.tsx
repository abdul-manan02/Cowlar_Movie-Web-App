import { useEffect, useState } from 'react';
import Header from './header';
import { HorizontalCarousel } from './horizontal-carousel';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './EmblaCarousel';
import { useAuth } from './AuthContext';
import Reviews from './Reviews';
import {
    fetchMovies,
    fetchUserMovies,
    fetchSearchData
} from '@/apiCalls/movie-apiCalls';
import { fetchUserReviews } from '@/apiCalls/review-apiCalls';
import Search from '@/components/Search';

export default function HomePage() {
    const OPTIONS: EmblaOptionsType = {
        axis: 'y',
        direction: 'rtl',
        loop: true
    };

    const [searchMovieParams, setSearchMovieParams] = useState<string>('');
    const [searchMovies, setSearchMovies] = useState<any[]>([]);
    const { isLoggedIn } = useAuth();
    const [movies, setMovies] = useState<any[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
    const [myMovies, setMyMovies] = useState<any[]>([]);
    const [latestMovies, setLatestMovies] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const movieState = {
        movies,
        setMovies
    };
    const searchMovieParamsState = {
        searchMovieParams,
        setSearchMovieParams
    };

    useEffect(() => {
        const fetchmovies = async () => {
            try {
                setIsLoading(true);
                const moviesData = await fetchMovies();
                setMovies(moviesData);
            } catch (error) {
                console.error('Error fetching movies:', error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        };

        fetchmovies();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const topRated = movies
                    .slice()
                    .sort((a, b) => b.rating - a.rating);
                setTopRatedMovies(topRated.slice(0, 5));

                const latest = movies
                    .slice()
                    .sort((a, b) => b.release_year - a.release_year);
                setLatestMovies(latest);

                if (isLoggedIn) {
                    const token = localStorage.getItem('token');
                    const userMoviesData = await fetchUserMovies(token);
                    setMyMovies(userMoviesData);

                    const userReviewsData = await fetchUserReviews(token);
                    setReviews(userReviewsData);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [movies, isLoggedIn]);

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            setIsLoading(true);
            try {
                const data = await fetchSearchData(searchMovieParams);
                setSearchMovies(data);
            } catch (error) {
                console.error('Error fetching search data:', error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        };

        fetchDataAndSetState();
    }, [searchMovieParams]);

    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <section className="pb-20">
                <Header
                    movieState={movieState}
                    searchMovieParamsState={searchMovieParamsState}
                />
            </section>

            {searchMovieParams !== '' ? (
                isLoading ? (
                    <div>Searching ...</div>
                ) : searchMovies.length > 0 ? (
                        <Search searchMovies={searchMovies} />
                ) : (
                    <div>No Movie Found</div>
                )
            ) : (
                <>
                    {isLoading ? (
                        <div className="flex justify-center items-center mb-40">
                            <p>Loading Top Rated Movies...</p>
                        </div>
                    ) : (
                        <section className="hidden lg:flex justify-center">
                            {topRatedMovies.length === 0 ? (
                                <p>No Top Rated Movies Found.</p>
                            ) : (
                                <div className="w-[90%] h-auto p-2">
                                    <EmblaCarousel
                                        slides={topRatedMovies}
                                        options={OPTIONS}
                                    />
                                </div>
                            )}
                        </section>
                    )}

                    {isLoading ? (
                        <>
                            <h1 className="ml-20 mt-7 mb-[-5] text-2xl font-bold">
                                Latest Movies
                            </h1>
                            <div className="flex justify-center items-center">
                                <p>Loading Latest Movies...</p>
                            </div>
                        </>
                    ) : (
                        <div>
                            <h1 className="ml-20 mt-7 mb-[-5] text-2xl font-bold">
                                Latest Movies
                            </h1>
                            <section className="pt-10 pb-5 flex justify-center items-center flex-col">
                                {latestMovies.length === 0 ? (
                                    <p>No Movies Found In Your Collection.</p>
                                ) : (
                                    <div className="">
                                        <HorizontalCarousel
                                            movies={latestMovies}
                                        />
                                    </div>
                                )}
                            </section>
                        </div>
                    )}

                    {isLoggedIn && (
                        <>
                            {isLoading ? (
                                <div>
                                    <h1 className="ml-20 mt-5 mb-[-5] text-2xl font-bold">
                                        My Movies
                                    </h1>
                                    <div className="flex justify-center items-center">
                                        <p>Loading My Movies...</p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="ml-20 mt-5 mb-[-5] text-2xl font-bold">
                                        My Movies
                                    </h1>
                                    <section className="pt-10 pb-5 flex justify-center items-center flex-col">
                                        {myMovies.length === 0 ? (
                                            <p>
                                                No Movies Found In Your
                                                Collection.
                                            </p>
                                        ) : (
                                            <div className="">
                                                <HorizontalCarousel
                                                    movies={myMovies}
                                                />
                                            </div>
                                        )}
                                    </section>
                                </div>
                            )}

                            {isLoading ? (
                                <div>
                                    <h1 className="ml-20 mt-7 mb-[-5] text-2xl font-bold">
                                        Your Reviews
                                    </h1>
                                    <div className="flex justify-center items-center">
                                        <p>Loading Your Reviews...</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="ml-20 mt-20">
                                    <h1 className="mt-7 mb-[-5] text-2xl font-bold mt-30">
                                        Your Reviews
                                    </h1>
                                    <section className="ml-5">
                                        {reviews.length === 0 ? (
                                            <div className="flex justify-center pb-20">
                                                <p>No Reviews Found.</p>
                                            </div>
                                        ) : (
                                            <Reviews
                                                reviews={reviews}
                                            ></Reviews>
                                        )}
                                    </section>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
