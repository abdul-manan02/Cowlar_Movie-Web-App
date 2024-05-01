import { Ratings } from './rating';
import { EditReview } from './Dialogs/EditReview';
import { useState } from 'react';

export default function Reviews({
    reviews
}: {
    reviews: any[]
}) {
    const [editReviewDialog, setEditReviewDialog] = useState<boolean>(false);
    const [reviewToEdit, setReviewToEdit] = useState<any>(null);

    const openEditModal = (review: any) => {
        setReviewToEdit(review)
        setEditReviewDialog(true);
    };

    return (
        <>
            <EditReview
                editReviewDialog={editReviewDialog}
                setEditReviewDialog={setEditReviewDialog}
                review={reviewToEdit}
            />

            {reviews.length > 0 ? (
                <div className="px-5 pb-10">
                    {reviews.map((review, index) => (
                        <blockquote
                            className="mt-4 border-2 border-blue-300 rounded-lg mb-2 p-4 cursor-pointer"
                            key={index}
                            onClick={() => openEditModal(review)}
                        >
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>

                            <div className="relative z-20 mt-6 flex flex-row items-center justify-between">
                                <span className="flex items-center gap-4">
                                    <img
                                        src={review.movie.image_url}
                                        alt="Profile image"
                                        height={40}
                                        width={40}
                                    />
                                    <div className="flex flex-col">
                                        <div className="flex flex-row items-center justify-between">
                                            <span className="text-base leading-[1.6] text-white font-normal">
                                                {review.movie.title}
                                            </span>
                                        </div>
                                        <Ratings
                                            rating={review.rating}
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
            ) : null}
        </>
    );
}
