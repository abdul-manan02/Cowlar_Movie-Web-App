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

export function HorizontalCarousel() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    return (
        <>
            <MovieDetailDialog
                setDialogOpen={setDialogOpen}
                dialogOpen={dialogOpen}
            />
            <Carousel
                className="w-full"
                opts={{
                    loop: true,
                    align: 'start'
                }}
                onClick={() => {
                    setDialogOpen(true);
                }}
            >
                <CarouselContent className="w-[80vw]">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-4 md:basis-1/2 lg:basis-1/4"
                        >
                            <div className="p-1">
                                <Card className="">
                                    <img
                                        // src="https://wallpaperset.com/w/full/3/d/1/366210.jpg"
                                        src="https://images.hdqwalls.com/download/john-wick-3-parabellum-poster-qf-2560x1440.jpg"
                                        alt="Movie image"
                                        className='cursor-pointer'
                                    />
                                    <div className="flex-col mt-2 mb-2 ml-2 mr-1">
                                        <p className="text-gray-100 text-sm">
                                            date
                                        </p>
                                        <h1 className="text-white text-xl font-bold">
                                            John Wick 3: Parabellum
                                        </h1>
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={imdb}
                                                alt="imdb logo"
                                                className="w-10"
                                            />
                                            <p className="text-lg font-semibold">
                                                10.2
                                            </p>
                                        </div>
                                        <p className="text-base">
                                            John Wick is on the run after
                                            killing a member of the
                                            international assassins' guild, and
                                            with a $14 million price tag on his
                                            head, he is the target of hit men
                                            and women everywhere.
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
