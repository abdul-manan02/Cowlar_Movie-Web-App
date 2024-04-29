import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { Card } from './ui/card';

export function HorizontalCarousel() {
    return (
        <Carousel
            className="w-full max-w-7xl"
            opts={{
                loop: true,
                align: 'start'
            }}
        >
            <CarouselContent className="-ml-1">
                {Array.from({ length: 8 }).map((_, index) => (
                    <CarouselItem
                        key={index}
                        className="pl-4 md:basis-1/2 lg:basis-1/4"
                    >
                        <div className="p-1">
                            <Card className="">
                                <img
                                    // src="https://wallpaperset.com/w/full/3/d/1/366210.jpg"
                                    src="https://images.hdqwalls.com/download/john-wick-3-parabellum-poster-qf-2560x1440.jpg"
                                    alt="Movie image"
                                />
                                <div className='p-5'>
                                    <h1>
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Ab, aut? Officiis
                                        eaque, excepturi atque ex obcaecati
                                        adipisci error eligendi impedit ipsam,
                                        sunt voluptate quasi nisi, omnis non
                                        iure ea facilis!
                                    </h1>
                                </div>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
