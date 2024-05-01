import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function EditReview({
    editReviewDialog,
    setEditReviewDialog,
    review
}: {
    editReviewDialog: boolean;
    setEditReviewDialog: React.Dispatch<React.SetStateAction<boolean>>;
    review: any;
}) {
    const [description, setDescription] = useState<string>('');

    const editReview = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (description === '') {
            alert('Description cannot be empty');
            return;
        }
            const url = `http://localhost:3000/api/v1/reviews/reviewId/${review.id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    description
                })
            });
            if (response.status === 200) {
                alert(
                    'Review has been added, you can reload the page to view it'
                );
                setEditReviewDialog(false);
            } else {
                alert('Error editing review');
            }
    };

    const deleteReview = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const url = `http://localhost:3000/api/v1/reviews/reviewId/${review.id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            alert('Review has been deleted');
            setEditReviewDialog(false);
        } else {
            alert('Error deleting review');
        }
    };

    return (
        <Dialog open={editReviewDialog} onOpenChange={setEditReviewDialog}>
            <DialogContent className="h-[30vw] w-[40vw] sm:max-w-[1025px] p-0 bg-transparent/50 overflow-y-auto">
                <form>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold pb-4 pt-2">
                            Edit Review
                        </h1>
                        <div className="flex flex-col gap-4">
                            <textarea
                                placeholder="Description"
                                className="w-[30vw] p-2 rounded-md text-white bg-transparent"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className="flex justify-between m-0">
                                <Button
                                    type="submit"
                                    className="w-[20%] mx-auto bg-transparent focus:bg-transparent"
                                    onClick={editReview}
                                >
                                    Edit Review
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-[20%] mx-auto bg-transparent focus:bg-transparent"
                                    onClick={deleteReview}
                                >
                                    Delete Review
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
