import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from '@/assets/logo.png';
import man from '@/assets/man.png'
import { SignIn } from './Dialogs/SignIn';
import { SignUp } from './Dialogs/SignUp';
import { AddMovie } from './Dialogs/AddMovie';
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

export default function Header() {
    const [signInDialogOpen, setSignInDialogOpen] = useState<boolean>(false);
    const [signUpDialogOpen, setSignUpDialogOpen] = useState<boolean>(false);
    const [addMovieDialogOpen, setAddMovieDialogOpen] =
        useState<boolean>(false);

    return (
        <>
            <div>
                <SignIn
                    setSignInDialogOpen={setSignInDialogOpen}
                    signInDialogOpen={signInDialogOpen}
                />
                <SignUp
                    setSignUpDialogOpen={setSignUpDialogOpen}
                    signUpDialogOpen={signUpDialogOpen}
                />
                <AddMovie
                    setAddMovieDialogOpen={setAddMovieDialogOpen}
                    addMovieDialogOpen={addMovieDialogOpen}
                />
            </div>

            <div className="">
                <div className="w-screen flex justify-between items-center p-6">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="Main logo" />
                        <h1 className="hidden lg:block text-xl font-semibold">
                            Movie Mania
                        </h1>
                    </div>
                    <div className="hidden md:flex w-full max-w-sm items-center space-x-4">
                        <Input
                            type="email"
                            placeholder="What do you want to watch?"
                        />
                        <Button type="submit">Search</Button>
                    </div>
                    {/* <div className="flex items-center gap-2">
                        <Button
                            className="bg-transparent hover:bg-transparent"
                            onClick={() => {
                                setSignInDialogOpen(true);
                            }}
                        >
                            Log in
                        </Button>
                        <Button
                            onClick={() => {
                                setSignUpDialogOpen(true);
                            }}
                        >
                            Sign up
                        </Button>
                    </div> */}
                    <div className="flex items-center gap-2">
                        <img
                            src={man}
                            alt="User"
                            className="w-8 h-8 rounded-full"
                        />
                        <div className="relative">
                            {/* <summary className="cursor-pointer">▼</summary> */}
                            <ul className="absolute left-0 mt-2 p-2 bg-white rounded shadow-md">
                                <li>
                                    <Button
                                        className=""
                                        onClick={() => {
                                            setAddMovieDialogOpen(true);
                                        }}
                                    >
                                        Add Movie
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        className=""
                                        onClick={() => {
                                            // Handle log out here
                                        }}
                                    >
                                        Log Out
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex md:hidden w-full max-w-sm items-center space-x-4">
                        <Input
                            type="email"
                            placeholder="What do you want to watch?"
                        />
                        <Button type="submit">Search</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
