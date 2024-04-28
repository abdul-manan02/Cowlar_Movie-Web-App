import React, { useState, useEffect } from 'react';

const movieData = [
    {
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        rating: "PG-13",
        btn: "Watch Now"
    },
    {
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        rating: "PG-13",
        btn: "Watch Trailer"
    },
    {
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        rating: "PG-13",
        btn: "More Info"
    }
];

function Carousel() {
    const [movies, setMovies] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    
    useEffect(() => {
        setMovies(movieData);
    }, []);
    const images = [
        "https://wallpapercave.com/wp/wp1945912.jpg",
        "https://wallpaperaccess.com/full/5485720.jpg",
        "https://wallpapercave.com/wp/wp1946074.jpg",
    ];
    const handleSelect = (index) => {
        setActiveIndex(index);
    }
    return (
        <div className=' h-[80vh] lg:h-[80%]'>
            <div className="relative border-2 border-red-200 h-full w-full carousel carousel-vertical">
                {images.map((url, index) => (
                    <>
                    
                    <div id={`item${index}`} className="carousel-item h-full" key={index} on={() => handleSelect(index)} >
                        <img src={url} alt={`Carousel item ${index + 1}`} loading="lazy" className='w-full h-full border-2 border-black'/>
                    </div>
                    <div className='absolute top-52 right-0 bg-opacity-30 rounded-xl bg-black z-10 p-4 border-2 border-white max-w-[400px]'>
                            <div className={`flex flex-col gap-2 carousel-details `}>
                                <h2 className="text-lg font-bold text-white">{movies[index]?.title}</h2>
                                <p className='text-white'>{movies[index]?.description}</p>
                                <p className='text-white'>Rating: {movies[index]?.rating}</p>
                                <button className="btn bg-red-500 hover:bg-red-700 border-none text-white font-bold py-2 px-4 rounded">
                                    {movies[index]?.btn}
                                </button>
                            </div>
                    </div>
                    </>
                ))}
            </div>

        
        </div>
    )
}

export default function Header() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        setMovies(movieData);
    }, []);
  return (
    <div className='w-screen h-screen bg-slate-300 flex justify-center items-center'>
        <div className=' w-full h-full border-2 border-[blue]'>
            <Carousel/>
        </div>
        {/* <div className='absolute z-10 bg-black border-2 border-[red] mt-[-10px] flex px-16 justify-between w-full h-auto'>
            
            <div className="flex flex-col justify-center w-fit py-2 gap-2 border-2 border-white ">
                <a href="#item0" className="btn btn-xs">1</a> 
                <a href="#item1" className="btn btn-xs">2</a> 
                <a href="#item2" className="btn btn-xs">3</a> 
            </div>
        </div> */}
    </div>
  )
}
