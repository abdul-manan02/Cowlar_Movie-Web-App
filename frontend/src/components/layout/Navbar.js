import React, {useState} from 'react'
import Logo from '../../assets/logo.png'
import { HiMagnifyingGlass } from "react-icons/hi2";
import AuthModal from '../custom/AuthModal';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // State to handle modal visibility
    const [isSignUp, setIsSignUp] = useState(false); 

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
  
    const switchAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

  return (
        <div className=" bg-white bg-opacity-45 rounded-b-xl navbar justify-between px-16 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
        <div className="w-fit ">
            <img src={Logo}/>
            <a className="btn btn-ghost text-xl text-white">MovieMania</a>
        </div>
        <div className='w-[40%] h-[40px] border-[1px] bg-slate-100 border-white rounded-lg px-2 flex items-center justify-start'>
            <HiMagnifyingGlass className='text-rose-700 text-[24px]'/>
            <div className="form-control text-rose-700 w-full h-[40px]">
                <input type="text" placeholder="What do you want to watch? " className="input bg-transparent text-rose-700 border-none focus-visible:outline-none" />
            </div>
        </div>
        <div className="flex-none gap-2">
            <button className='btn bg-rose-400 hover:bg-rose-700 text-white' onClick={() => { setIsSignUp(false); toggleModal(); }}>Sign In</button>
            <button className="btn" onClick={() => { setIsSignUp(true); toggleModal(); }}>Sign Up</button>
            <AuthModal isOpen={isOpen} isSignUp={isSignUp} toggleModal={toggleModal} switchAuthMode={switchAuthMode}/>
            {/* <div className='btn bg-rose-400 hover:bg-rose-700'>
                <p className='text-white'>Sign In</p>
            </div> */}
            {/* <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div> */}
        </div>
        </div>
  )
}
