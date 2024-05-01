import { useEffect, useState } from 'react';
import { HorizontalCarousel } from './horizontal-carousel';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchMovieReceived = location.state.searchMovie;

    const [searchMovie, setSearchMovie] = useState<string>(searchMovieReceived);
    const [movies, setMovies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        const url = `http://localhost:3000/api/v1/movies/search?title=${searchMovie}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setMovies(data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <img
                src={logo}
                alt="Main logo"
                className="cursor-pointer ml-5 mt-5"
                onClick={() => {
                    navigate('/');
                }}
            />
            <div className="w-screen h-screen flex flex-col items-center mt-4">
                <div className="flex w-full max-w-sm items-center space-x-4">
                    <Input
                        type="email"
                        placeholder="What do you want to watch?"
                        value={searchMovie}
                        onChange={(e) => setSearchMovie(e.target.value)}
                    />
                    <Button
                        type="submit"
                        onClick={() => {
                            fetchData();
                        }}
                    >
                        Search
                    </Button>
                </div>

                <div>
                    {isLoading ? (
                        <p className="text-center mt-10 text-2xl font-bold">
                            Loading...
                        </p>
                    ) : (
                        <section className="pt-10 pb-5 flex justify-center items-center flex-col">
                            <div className="">
                                {movies.length > 0 ? (
                                    <HorizontalCarousel movies={movies} />
                                ) : (
                                    <p>No movies found</p>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
