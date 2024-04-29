import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import imdb from '@/assets/imdb.png';
import { ScrollArea } from './ui/scroll-area';
import { Ratings } from './rating';
import man from '@/assets/man.png';
import { Textarea } from './ui/textarea';

export function MovieDetailDialog({
    dialogOpen,
    setDialogOpen
    // data
}: {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // data: {
    //     image: string;
    //     title: string;
    //     releaseDate: string;
    //     description: string;
    //     reviews: any;
    // };
}) {
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[1025px] p-0 bg-transparent/50 overflow-y-auto">
                <ScrollArea className="max-h-[800px]">
                    <div className="flex flex-col">
                        <img
                            src="https://images.hdqwalls.com/download/john-wick-3-parabellum-poster-qf-2560x1440.jpg"
                            alt=""
                        />
                        <div className="px-5 pb-2 flex justify-between items-center">
                            <h1 className="text-3xl font-bold">
                                John Wick 3: Parabellum
                            </h1>
                            <div className="flex items-center gap-2">
                                <img
                                    src={imdb}
                                    alt="imdb logo"
                                    className="w-16"
                                />
                                <p className="text-xl font-semibold text-white">
                                    10.2
                                </p>
                            </div>
                        </div>
                        <p className="px-5 pb-8 text-lg">
                            John Wick is on the run after killing a member of
                            the international assassins' guild, and with a $14
                            million price tag on his head, he is the target of
                            hit men and women everywhere. John Wick is on the
                            run after killing a member of the international
                            assassins' guild, and with a $14 million price tag
                            on his head, he is the target of hit men and women
                            everywhere.
                        </p>

                        <p className="text-xl px-5 font-semibold">Reviews</p>
                        <div className="px-5 mt-2">
                            <Textarea placeholder="What do you think about the movie?" />
                            <div className="flex justify-end items-end">
                                <Button className="mt-4">Add Review</Button>
                            </div>
                        </div>
                        <div className="px-5 pb-10">
                            <blockquote className="mt-4">
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
                                                Bilal Khan
                                            </span>
                                            <Ratings rating={3} size={15} />
                                        </div>
                                    </span>
                                </div>

                                <div className="mt-2 relative z-20 text-base ml-14 leading-[1.6] text-white/70 font-normal">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Similique modi amet,
                                    magnam, suscipit ex eos eaque, animi laborum
                                    magni nihil placeat molestiae sequi officiis
                                    eligendi nobis accusantium voluptas corporis
                                    consequatur.
                                </div>
                            </blockquote>

                            <blockquote className="mt-4">
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
                                                Bilal Khan
                                            </span>
                                            <Ratings rating={3} size={15} />
                                        </div>
                                    </span>
                                </div>

                                <div className="mt-2 relative z-20 text-base ml-14 leading-[1.6] text-white/70 font-normal">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Similique modi amet,
                                    magnam, suscipit ex eos eaque, animi laborum
                                    magni nihil placeat molestiae sequi officiis
                                    eligendi nobis accusantium voluptas corporis
                                    consequatur.
                                </div>
                            </blockquote>
                            <blockquote className="mt-4">
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
                                                Bilal Khan
                                            </span>
                                            <Ratings rating={3} size={15} />
                                        </div>
                                    </span>
                                </div>

                                <div className="mt-2 relative z-20 text-base ml-14 leading-[1.6] text-white/70 font-normal">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Similique modi amet,
                                    magnam, suscipit ex eos eaque, animi laborum
                                    magni nihil placeat molestiae sequi officiis
                                    eligendi nobis accusantium voluptas corporis
                                    consequatur.
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
