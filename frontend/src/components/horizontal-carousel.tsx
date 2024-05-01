import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { Card } from './ui/card';
import imdb from '@/assets/imdb.png';
import { MovieDetailDialog } from './Dialogs/movie-detail';
import { useState } from 'react';

export function HorizontalCarousel({ movies }: { movies: any[]}) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<any>();

    return (
        <>
            <MovieDetailDialog
                setDialogOpen={setDialogOpen}
                dialogOpen={dialogOpen}
                movie={selectedMovie}
            />
            <Carousel
                className="w-full"
                opts={{
                    loop: true,
                    align: 'start'
                }}
            >
                <CarouselContent className="w-[80vw] h-[50vh]">
                    {movies.map((movie: any, index: any) => (
                        <CarouselItem
                            key={index}
                            className="pl-4 md:basis-1/2 lg:basis-1/4"
                        >
                            <div className="p-1">
                                <Card className="overflow-hidden">
                                    <img
                                        src={movie.image_url}
                                        alt="Movie image"
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setSelectedMovie(movie);
                                            setDialogOpen(true);
                                        }}
                                    />
                                    <div className="flex-col mt-2 mb-2 ml-2 mr-1">
                                        <p className="text-gray-100 text-sm">
                                            {movie.release_year}
                                        </p>
                                        <h1 className="text-white text-xl font-bold">
                                            {movie.title}
                                        </h1>
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={imdb}
                                                alt="imdb logo"
                                                className="w-10"
                                            />
                                            <p className="text-lg font-semibold">
                                                {movie.rating}
                                            </p>
                                        </div>
                                        <p className="text-base">
                                            {movie.description}
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    );
}
