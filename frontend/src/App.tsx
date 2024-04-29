import Header from './components/header';
import { HorizontalCarousel } from './components/horizontal-carousel';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './components/EmblaCarousel';

function App() {
    const OPTIONS: EmblaOptionsType = {
        axis: 'y',
        direction: 'rtl',
        loop: true
    };
    const SLIDE_COUNT = 5;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

    return (
        <div className="w-screen h-screen">
            <section className="pb-20">
                <Header />
            </section>
            <section className="hidden lg:flex justify-center">
                <div className="w-[90%] h-auto p-2">
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </div>
            </section>

            <div>
                <h1 className="ml-20 mt-5 mb-[-5] text-2xl font-bold">Search Results</h1>
                <section className="pt-10 pb-5 flex justify-center items-center flex-col">
                    <div className="">
                        <HorizontalCarousel />
                    </div>
                </section>
            </div>

            <div>
                <h1 className="ml-20 mt-5 mb-[-5] text-2xl font-bold">My Movies</h1>
                <section className="pt-10 pb-5 flex justify-center items-center flex-col">
                    <div className="">
                        <HorizontalCarousel />
                    </div>
                </section>
            </div>

            <div>
                <h1 className="ml-20 mt-7 mb-[-5] text-2xl font-bold">Latest Movies</h1>
                <section className="pt-10 pb-5 flex justify-center items-center flex-col">
                    <div className="">
                        <HorizontalCarousel />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default App;
