import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import imdb from '@/assets/imdb.png';
import { useState } from 'react';
import { MovieDetailDialog } from './Dialogs/movie-detail';

type PropType = {
    slides: any[];
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
    const [selectedMovie, setSelectedMovie] = useState<any>();

    return (
        <>
            <MovieDetailDialog
                setDialogOpen={setDialogOpen}
                dialogOpen={dialogOpen}
                movie={selectedMovie}
            />

            <section className="embla" dir="rtl">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {slides.length > 0
                            ? slides.map((movie, index) => (
                                  <div
                                      className="embla__slide"
                                      key={index}
                                      onClick={() => {
                                          setSelectedMovie(movie);
                                          setDialogOpen(true);
                                      }}
                                  >
                                      <div className="embla__slide__number">
                                          <img
                                              src={movie.image_url}
                                              alt="Movie image"
                                              className="cursor-pointer opacity-55 object-cover w-full h-full"
                                          />
                                          <div className="absolute flex-col right-16 w-1/3 text-start flex items-start justify-start ">
                                              <h1 className="text-white text-6xl font-bold">
                                                  {movie.title}
                                              </h1>
                                              <div className="flex items-center flex-row-reverse gap-2">
                                                  <img
                                                      src={imdb}
                                                      alt="imdb logo"
                                                      className="w-16"
                                                  />
                                                  <p className="text-xl font-semibold">
                                                      {movie.rating}
                                                  </p>
                                              </div>
                                              <p className="text-xl">
                                                  {movie.description}
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              ))
                            : null}
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
