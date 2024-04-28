import React from 'react'
import MovieCard from './MovieCard'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ResponsiveCarousel = ({ data, renderItem }) => {
    const settings = {
      autoplay: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: true,
      initialSlide: 1,
      arrows: true,
      focusOnSelect: true,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            initialSlide: 1,
          },
        },
      ],
    };
    return (
        <div className="px-8">
            <style jsx global>
                {`
                    .slick-prev:before, .slick-next:before {
                    color: black !important; // Ensure black is used despite any other styles
                    }
                    .slick-slide > div {
                        display: flex;
                        justify-content: center; // Center the cards within each slide
                    }
                    .slick-list {
                        margin: 0 auto; // Centers the sliding track within the slider container
                    }
                `}
                </style>
          <Slider {...settings} className=''>
            {data?.map((item, index) => (
              <div key={index} className='pl-[20%] py-2'>
                {renderItem(item, index)}
              </div>
            ))}
          </Slider>
        </div>
    )  ;
}
const movies = [
    { id: 1, title: "Movie 1", description: "Description 1" },
    { id: 2, title: "Movie 2", description: "Description 2" },
    { id: 3, title: "Movie 3", description: "Description 3" },
    { id: 4, title: "Movie 4", description: "Description 4" },
    { id: 5, title: "Movie 5", description: "Description 5" },
    { id: 6, title: "Movie 6", description: "Description 6" },
    { id: 7, title: "Movie 7", description: "Description 7" },
    { id: 8, title: "Movie 8", description: "Description 8" },
    // More movies...
];

function chunkArray(array, size) {
    return array.reduce((acc, val, i) => {
        let idx = Math.floor(i / size);
        let page = acc[idx] || (acc[idx] = []);
        page.push(val);
        return acc;
    }, []);
}


// function Carouselw() {
//     const slides = chunkArray(movies, 4);
//     return (
//         <div className="carousel w-full">
//             {slides.map((slide, index) => (
//                 <div id={`slide${index}`} className="carousel-item relative w-full" key={index}>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//                         {slide.map(movie => (
//                             <MovieCard key={movie.id} {...movie} />
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }


export default function Banner() {
    const renderItem = (item, index) => (
        <MovieCard/> 
    );
  return (
    <div className='w-screen h-auto flex flex-col gap-6 py-2 px-16'>
        <p className='text-[20px] font-[600] '>Latest Movies</p>
        <div className=''>

            <ResponsiveCarousel data={movies} renderItem={renderItem} />
        </div>
        {/* <MovieCard/> */}
    </div>
  )
}

