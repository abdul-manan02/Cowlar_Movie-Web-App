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
        <div>
            <section className="pb-20">
                <Header />
            </section>
            <section className="hidden xl:block">
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </section>

            <section className="py-20 flex justify-center items-center">
                <HorizontalCarousel />
            </section>
        </div>
    );
}

export default App;
