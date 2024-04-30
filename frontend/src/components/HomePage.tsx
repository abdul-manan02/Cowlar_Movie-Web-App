import { useEffect, useState } from 'react';
import Header from './header';
import { HorizontalCarousel } from './horizontal-carousel';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './EmblaCarousel';
import { useAuth } from './AuthContext';
import { Ratings } from '@/components/rating';
import man from '@/assets/man.png';

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

    const movieState = {
        movies,
        setMovies
    };

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/movies')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const topRated = movies.sort((a, b) => b.rating - a.rating);
        setTopRatedMovies(topRated.slice(0, 5));

        const latest = movies.sort((a, b) => b.release_year - a.release_year);
        setLatestMovies(latest);

        if (localStorage.getItem('token')) {
            fetch('http://localhost:3000/api/v1/movies/userMovies', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + `${localStorage.getItem('token')}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setMyMovies(data);
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

                console.log('1', reviews)
        }
    }, [movies, isLoggedIn]);

    return (
        <div className="w-screen h-screen">
            <section className="pb-20">
                <Header movieState={movieState} />
            </section>

            <section className="hidden lg:flex justify-center">
                <div className="w-[90%] h-auto p-2">
                    <EmblaCarousel slides={topRatedMovies} options={OPTIONS} />
                </div>
            </section>

            {isLoggedIn ? (
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
            ) : null}

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

            {/* <div>
                <div className="px-5 pb-10">
                    {reviews.map((review, index) => (
                        <blockquote className="mt-4" key={index}>
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>

                            <div className="relative z-20 mt-6 flex flex-row items-center">
                                <span className="flex items-center gap-4">
                                    <img
                                        src={man}
                                        alt="Profile image"
                                        height={40}
                                        width={40}
                                    />
                                    <div className="flex flex-col ">
                                        <span className=" text-sm leading-[1.6] text-white font-normal">
                                            {review.user.username}
                                        </span>
                                        <Ratings
                                            rating={review.rating}
                                            size={15}
                                        />
                                    </div>
                                </span>
                            </div>

                            <div className="mt-2 relative z-20 text-base ml-14 leading-[1.6] text-white/70 font-normal">
                                {review.review}
                            </div>
                        </blockquote>
                    ))}
                </div>
            </div> */}
        </div>
    );
}
