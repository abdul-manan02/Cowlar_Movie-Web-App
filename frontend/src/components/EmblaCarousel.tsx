import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import imdb from '@/assets/imdb.png';
import { useState } from 'react';
import { MovieDetailDialog } from './movie-detail';

type PropType = {
    slides: number[];
    options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props;
    // const [emblaRef, emblaApi] = useEmblaCarousel(options);
    // const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ pauseOnInteraction: false })
    ]);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    return (
        <>
            <MovieDetailDialog
                setDialogOpen={setDialogOpen}
                dialogOpen={dialogOpen}
            />

            <section className="embla" dir="rtl">
                <div
                    className="embla__viewport"
                    ref={emblaRef}
                    onClick={() => {
                        setDialogOpen(true);
                    }}
                >
                    <div className="embla__container">
                        {slides.map((index) => (
                            <div className="embla__slide" key={index}>
                                <div className="embla__slide__number">
                                    <img
                                        // src="https://wallpaperset.com/w/full/3/d/1/366210.jpg"
                                        src="https://images.hdqwalls.com/download/john-wick-3-parabellum-poster-qf-2560x1440.jpg"
                                        alt="Movie image"
                                        className="opacity-55"
                                    />
                                    <div className="absolute flex-col right-16 w-1/3 text-start flex items-start justify-start ">
                                        <h1 className="text-white text-6xl font-bold">
                                            John Wick 3: Parabellum
                                        </h1>
                                        <div className="flex items-center flex-row-reverse gap-2">
                                            <img
                                                src={imdb}
                                                alt="imdb logo"
                                                className="w-16"
                                            />
                                            <p className="text-xl font-semibold">
                                                10.2
                                            </p>
                                        </div>
                                        <p className="text-xl">
                                            John Wick is on the run after
                                            killing a member of the
                                            international assassins' guild, and
                                            with a $14 million price tag on his
                                            head, he is the target of hit men
                                            and women everywhere.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="embla__controls">
                    <div className="embla__dots">
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                onClick={() => onDotButtonClick(index)}
                                className={'embla__dot'.concat(
                                    index === selectedIndex
                                        ? ' embla__dot--selected bg-red-500'
                                        : ''
                                )}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default EmblaCarousel;
