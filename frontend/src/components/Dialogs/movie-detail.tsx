import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import imdb from '@/assets/imdb.ico';
import { ScrollArea } from '../ui/scroll-area';
import { Ratings } from '../rating';
import man from '@/assets/man.ico';
import { Textarea } from '../ui/textarea';
import { useAuth } from '../AuthContext';
import { useEffect, useState } from 'react';
import { fetchReviewsForMovie, addReviewForMovie } from '@/apiCalls/review-apiCalls';

export function MovieDetailDialog({
    dialogOpen,
    setDialogOpen,
    movie
}: {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    movie: any;
}) {
    const [reviews, setReviews] = useState<any[]>([]);
    const { isLoggedIn } = useAuth();
    const [reviewAdded, setReviewAdded] = useState(false);
    const [newReview, setNewReview] = useState('');
    const [showVideo, setShowVideo] = useState(false);

    const closeDialog = () => {
        setNewReview('');
        setDialogOpen(false);
    }

    useEffect(() => {
        if (dialogOpen) {
          setShowVideo(false);
        }
      }, [dialogOpen]);
      
      useEffect(() => {
        const fetchData = async () => {
          if (movie) {
            try {
              const token = localStorage.getItem('token');
              const reviews = await fetchReviewsForMovie(movie._id, token);
              setReviews(reviews.length > 0 ? reviews : []);
            } catch (error) {
              console.error('Error fetching reviews:', error);
            }
          }
        };
      
        fetchData();
      }, [movie]);
      
      const addReview = async () => {
        try {
          const token = localStorage.getItem('token');
          const success = await addReviewForMovie(movie._id, newReview, token);
          if (success) {
            setNewReview('')
            setReviewAdded(true);
            alert('Review has been added, you can reload the page to view it');
            setDialogOpen(false)
          }
        } catch (error: any) {
          alert('Error: ' + error.message);
        }
      };

    return (
        <Dialog open={dialogOpen} onOpenChange={closeDialog}>
            <DialogContent className="h-[85vh] w-[70vw] sm:max-w-[1025px] p-0 bg-transparent/50 overflow-y-auto">
                <ScrollArea className="max-h-[800px]">
                    <div className="flex flex-col">
                        {movie && (
                            <>
                                <div className="relative w-full h-auto">
                                    <img
                                        src={movie.image_url}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                    {showVideo ? (
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-[450px] xl:h-[600px] aspect-w-16 aspect-h-9">
                                            <iframe
                                                className="absolute top-30 left-0 w-full h-full"
                                                src={`https://www.youtube.com/embed/${movie.video_id}`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                            <Button
                                                className="bg-white text-black mt-2 block mx-auto absolute bottom-20 right-3"
                                                onClick={() =>
                                                    setShowVideo(false)
                                                }
                                            >
                                                Close Ad
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            className="absolute bottom-4 right-3 bg-white text-black"
                                            onClick={() => setShowVideo(true)}
                                        >
                                            Watch Trailer
                                        </Button>
                                    )}
                                </div>
                                <div className="px-5 pb-2 flex justify-between items-center">
                                    <h1 className="text-3xl font-bold">
                                        {movie.title}
                                    </h1>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={imdb}
                                            alt="imdb logo"
                                            className="w-16"
                                        />
                                        <p className="text-xl font-semibold text-white">
                                            {movie.rating}
                                        </p>
                                    </div>
                                </div>
                                <p className="px-5 pb-8 text-lg">
                                    {movie.description}
                                </p>

                                <p className="text-xl px-5 font-semibold">
                                    Reviews
                                </p>
                                {isLoggedIn && !reviewAdded && (
                                    <div className="px-5 mt-2">
                                        <Textarea
                                            placeholder="What do you think about the movie?"
                                            value={newReview}
                                            onChange={(e) =>
                                                setNewReview(e.target.value)
                                            }
                                        />
                                        <div className="flex justify-end items-end">
                                            <Button
                                                className="mt-4"
                                                onClick={addReview}
                                            >
                                                Add Review
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                <div className="px-5 pb-10">
                                    {reviews.map((review, index) => (
                                        <blockquote
                                            className="mt-4"
                                            key={index}
                                        >
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
                                                            {
                                                                review.user
                                                                    .username
                                                            }
                                                        </span>
                                                        <Ratings
                                                            rating={
                                                                review.rating
                                                            }
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
                            </>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
