import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { addMovie } from '@/apiCalls/movie-apiCalls';

interface MovieState {
    movies: any[];
    setMovies: React.Dispatch<React.SetStateAction<any[]>>;
}

interface AddMovieProps {
    addMovieDialogOpen: boolean;
    setAddMovieDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    movieState: MovieState;
}

export function AddMovie({
    addMovieDialogOpen,
    setAddMovieDialogOpen,
    movieState
}: AddMovieProps) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<number | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');

    const setStatesToEmpty = () => {
        setTitle('');
        setDescription('');
        setReleaseYear(null);
        setImageUrl('');
        setVideoUrl('');
    }

    const closeDialog = () => {
        setStatesToEmpty()
        setAddMovieDialogOpen(false);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const result = await addMovie(
                title,
                description,
                releaseYear,
                imageUrl,
                videoUrl
            );

            movieState.setMovies((prevMovies) => [...prevMovies, result]);
            setStatesToEmpty()
            setAddMovieDialogOpen(false);
        } catch (error) {
            alert('Error adding movie');
        }
    };

    return (
        <Dialog open={addMovieDialogOpen} onOpenChange={closeDialog}>
            <DialogContent className="h-[30vw] w-[40vw] sm:max-w-[1025px] p-0 bg-transparent/50 overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold pb-4 pt-2">
                            Add Movie
                        </h1>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-[30vw] p-2 rounded-md text-white bg-transparent"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoComplete="off"
                            />

                            <textarea
                                placeholder="Description"
                                className="w-[30vw] p-2 rounded-md text-white bg-transparent"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                autoComplete="off"
                            />

                            <input
                                type="text"
                                placeholder="Release Year"
                                className="w-[30vw] p-2 rounded-md text-white bg-transparent"
                                value={releaseYear}
                                onChange={(e) => setReleaseYear(Number(e.target.value))}
                                autoComplete="off"
                            />

                            <input
                                type="text"
                                placeholder="Image URL"
                                className="w-[30vw] p-2 rounded-md text-white bg-transparent"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                autoComplete="off"
                            />

                            <input
                                type="text"
                                placeholder="Video URL"
                                className="w-[30vw] p-2 rounded-md text-white bg-transparent"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                autoComplete="off"
                            />

                            <Button type="submit" className="w-[40%] mx-auto">
                                Add Movie
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
