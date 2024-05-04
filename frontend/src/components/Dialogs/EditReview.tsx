import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { editReview, deleteReview } from '@/apiCalls/review-apiCalls';

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

    const closeDialog = () => {
        setDescription('');
        setEditReviewDialog(false);
    }

    const edit_review = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (description === '') {
            alert('Description cannot be empty');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            if (token === null) {
                throw new Error('Token is null');
            }
            const success = await editReview(review._id, description, token);
            if (success) {
                alert('Review has been edited');
                setDescription('');
                setEditReviewDialog(false);
            }
        } catch (error: any) {
            alert('Error: ' + error.message);
        }
    };

    const delete_review = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token === null) {
                throw new Error('Token is null');
            }
            const success = await deleteReview(review._id, token);
            if (success) {
                alert('Review has been deleted');
                setDescription('');
                setEditReviewDialog(false);
            }
        } catch (error: any) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <Dialog open={editReviewDialog} onOpenChange={closeDialog}>
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
                                    onClick={edit_review}
                                >
                                    Edit Review
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-[20%] mx-auto bg-transparent focus:bg-transparent"
                                    onClick={delete_review}
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
