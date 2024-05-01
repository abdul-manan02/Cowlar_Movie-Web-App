import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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
    const [releaseYear, setReleaseYear] = useState<string | ''>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(
                'http://localhost:3000/api/v1/movies',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        release_year: releaseYear,
                        image_url: imageUrl,
                        video_url: videoUrl
                    })
                }
            );
            if (response.status === 200) {
                const result = await response.json();

                movieState.setMovies((prevMovies) => [
                    ...prevMovies,
                    result
                ]);
                setAddMovieDialogOpen(false);
            } else {
                alert('Error adding movie');
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <Dialog open={addMovieDialogOpen} onOpenChange={setAddMovieDialogOpen}>
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
                            />
                            <textarea
                                placeholder="Description"
                                className="w-[30vw] p-2 rounded-md text-white bg-transparent"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Release Year"
                                className="w-[30vw] p-2 rounded-md text-white bg-transparent"
                                value={releaseYear}
                                onChange={(e) => setReleaseYear(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="w-[30vw] p-2 rounded-md text-white bg-transparent"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Video URL"
                                className="w-[30vw] p-2 rounded-md text-white bg-transparent"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
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
