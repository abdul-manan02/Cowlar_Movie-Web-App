import { useEffect, useState } from 'react';
import Header from './header';
import { HorizontalCarousel } from './horizontal-carousel';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './EmblaCarousel';
import { useAuth } from './AuthContext';
import Reviews from './Reviews';

export default function HomePage() {
    const OPTIONS: EmblaOptionsType = {
        axis: 'y',
        direction: 'rtl',
        loop: true
    };

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

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:3000/api/v1/movies')
            .then((response) => response.json())
            .then((data) => {
                const modifiedMovies = data.map((movie: any) => {
                    const videoId = movie.video_url.split('/').pop();
                    return {
                        ...movie,
                        video_id: videoId
                    };
                });

                setMovies(modifiedMovies);
            })
            .catch((error) => console.error(error));

        setIsLoading(false);
    }, []);

    useEffect(() => {
        const topRated = movies.sort((a, b) => b.rating - a.rating);
        setTopRatedMovies(topRated.slice(0, 5));

        const latest = movies.sort((a, b) => b.release_year - a.release_year);
        setLatestMovies(latest);

        if (localStorage.getItem('token')) {
            setIsLoading(true);
            fetch('http://localhost:3000/api/v1/movies/userMovies', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + `${localStorage.getItem('token')}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    const modifiedMovies = data.map((movie: any) => {
                        const videoId = movie.video_url.split('/').pop();
                        return {
                            ...movie,
                            video_id: videoId
                        };
                    });

                    setMyMovies(modifiedMovies);
                })
                .catch((error) => console.error(error));

            fetch('http://localhost:3000/api/v1/reviews/userReviews', {
                headers: {
                    Authorization:
                        'Bearer ' + `${localStorage.getItem('token')}`
                }
            })
                .then((response) => response.json())
                .then((data) => setReviews(data))
                .catch((error) => console.error(error));
            setIsLoading(false);
        }
    }, [movies, isLoggedIn]);

    return (
        <div className="w-screen h-screen">
            <section className="pb-20">
                <Header movieState={movieState} />
            </section>

            {isLoading ? (
                <div className="flex justify-center items-center mb-40">
                    <p>Loading Top Rated Movies...</p>
                </div>
            ) : (
                <section className="hidden lg:flex justify-center">
                    <div className="w-[90%] h-auto p-2">
                        <EmblaCarousel
                            slides={topRatedMovies}
                            options={OPTIONS}
                        />
                    </div>
                </section>
            )}

            {isLoggedIn ? (
                isLoading ? (
                    <>
                        <h1 className="ml-20 mt-5 mb-[-5] text-2xl font-bold">
                            My Movies
                        </h1>
                        <div className="flex justify-center items-center">
                            <p>Loading My Movies...</p>
                        </div>
                    </>
                ) : (
                    <div>
                        <h1 className="ml-20 mt-5 mb-[-5] text-2xl font-bold">
                            My Movies
                        </h1>
                        <section className="pt-10 pb-5 flex justify-center items-center flex-col">
                            <div className="">
                                <HorizontalCarousel movies={myMovies} />
                            </div>
                        </section>
                    </div>
                )
            ) : null}

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
                        <div className="">
                            <HorizontalCarousel movies={latestMovies} />
                        </div>
                    </section>
                </div>
            )}

            {isLoggedIn ? (
                isLoading ? (
                    <>
                        <h1 className="ml-20 mt-7 mb-[-5] text-2xl font-bold mt-30">
                            Your Reviews
                        </h1>
                        <div className="flex justify-center items-center">
                            <p>Loading Your Reviews...</p>
                        </div>
                    </>
                ) : (
                    <div className="ml-20 mt-20">
                        <h1 className="mt-7 mb-[-5] text-2xl font-bold mt-30">
                            Your Reviews
                        </h1>
                        <section className="ml-5">
                            <Reviews reviews={reviews}></Reviews>
                        </section>
                    </div>
                )
            ) : null}
        </div>
    );
}
