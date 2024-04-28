import React from 'react'
import Logo from '../../assets/imdb.svg'
function parseTitle(title) {
    if (title.length > 20) {
        return `${title.substring(0, 17)}...`; // Truncate and add ellipsis
    }
    return title; // Return the title unchanged if it's short enough
}

export default function MovieCard() {
    const title = "Stranger Things:The";
  return (
    <div className='w-[200px] h-[320px] rounded-md shadow-[0px_0px_10px_3px_#00000024]'>
        <div className='w-full h-[65%] bg-slate-100'>   
            <img src='https://wallpapercave.com/wp/wp1945912.jpg' alt="none" className='h-full rounded-t-md'/>
        </div>
        <div className=' h-[35%] max-h-auto flex flex-col gap-2 pt-3 px-2'>
            <p className='font-[300] text-slate-500 text-[14px] p-0 m-0 '>2005</p>
            <p className='font-[600] text-black text-[16px] p-0 m-0 '>{parseTitle(title)}</p>
            <div className='flex gap-2'>
                <img src={Logo} className='w-[26px]'/>
                <p className='font-[600] text-black text-[16px]'>5</p>
            </div>
        </div>
    </div>
  )
}
