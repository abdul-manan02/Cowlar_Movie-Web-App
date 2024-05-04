import React, { useState } from 'react';
import { Card } from './ui/card';
import { MovieDetailDialog } from './Dialogs/movie-detail';
import imdb from '@/assets/imdb.png';

export default function Search({ searchMovies }: { searchMovies: any }) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<any>();

    return (
        <>
            <MovieDetailDialog
                setDialogOpen={setDialogOpen}
                dialogOpen={dialogOpen}
                movie={selectedMovie}
            />

            {searchMovies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pr-4 pl-4">
                    {searchMovies.map((movie) => (
                        <Card
                            key={movie.id}
                            className="overflow-hidden flex flex-col h-auto w-full cursor-pointer"
                        >
                            <img
                                src={movie.image_url}
                                alt="Movie image"
                                className="cursor-pointer flex-shrink-0 w-full h-auto"
                                onClick={() => {
                                    setSelectedMovie(movie);
                                    setDialogOpen(true);
                                }}
                            />
                            <div className="flex flex-col flex-grow p-4">
                                <p className="text-gray-100 text-sm">
                                    {movie.release_year}
                                </p>
                                <h1 className="text-white text-xl font-bold">
                                    {movie.title}
                                </h1>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : // <div className="flex flex-wrap justify-evenly gap-2 gap-y-8 p-4">
            //     {searchMovies.map((movie: any, index: any) => (
            //         <Card className="overflow-hidden w-[20%] h-[20vw]">
            //             <img
            //                 src={movie.image_url}
            //                 alt="Movie image"
            //                 className="cursor-pointer"
            //                 onClick={() => {
            //                     setSelectedMovie(movie);
            //                     setDialogOpen(true);
            //                 }}
            //             />
            //             <div className="flex-col mt-2 mb-2 ml-2 mr-1">
            //                 <p className="text-gray-100 text-sm">
            //                     {movie.release_year}
            //                 </p>
            //                 <h1 className="text-white text-xl font-bold">
            //                     {movie.title}
            //                 </h1>
            //                 <div className="flex items-center gap-2">
            //                     <img
            //                         src={imdb}
            //                         alt="imdb logo"
            //                         className="w-10"
            //                     />
            //                     <p className="text-lg font-semibold">
            //                         {movie.rating}
            //                     </p>
            //                 </div>
            //                 <p className="text-base">{movie.description}</p>
            //             </div>
            //         </Card>
            //     ))}
            // </div>
            null}
        </>
    );
}
