import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { deleteMovie } from '@/apiCalls/movie-apiCalls';

export function MovieDeleteDialog({
    setMovieDeleteDialogOpen,
    movieDeleteDialogOpen,
    movie
}: {
    movieDeleteDialogOpen: boolean;
    setMovieDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    movie: any;
}) {
    const closeDialog = () => {
        setMovieDeleteDialogOpen(false);
    };

    const deletemovie = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token === null) {
                throw new Error('Token is null');
            }
            const success = await deleteMovie(movie._id);
            if (success) {
                alert('Movie has been deleted, refresh the page to see changes.');
                setMovieDeleteDialogOpen(false);
            }
        } catch (error: any) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <Dialog open={movieDeleteDialogOpen} onOpenChange={closeDialog}>
            <DialogContent className="h-[20vw] w-[30vw] sm:max-w-[1025px] p-0 bg-transparent/50 flex flex-col justify-center items-center gap-10">
                <h1 className='font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>Delete Movie</h1>
                <div className='flex items-center justify-center gap-4'>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    onClick={deletemovie}
                >
                    Yes
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    onClick={closeDialog}
                >
                    No
                </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
