import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from '@/assets/logo.png';
import { SignIn } from './Dialogs/SignIn';
import { SignUp } from './Dialogs/SignUp';
import { AddMovie } from './Dialogs/AddMovie';
import { useAuth } from '@/components/AuthContext';

interface MovieState {
    movies: any[];
    setMovies: React.Dispatch<React.SetStateAction<any[]>>;
}
interface SearchMovieParamsState {
    searchMovieParams: any[];
    setSearchMovieParams: React.Dispatch<React.SetStateAction<string>>;
}
interface HeaderProps {
    movieState: MovieState;
    searchMovieParamsState: SearchMovieParamsState;
}

const Header: React.FC<HeaderProps> = ({
    movieState,
    searchMovieParamsState
}) => {
    const [signInDialogOpen, setSignInDialogOpen] = useState<boolean>(false);
    const [signUpDialogOpen, setSignUpDialogOpen] = useState<boolean>(false);
    const [addMovieDialogOpen, setAddMovieDialogOpen] =
        useState<boolean>(false);

    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const handleSearchInputChange = (e: any) => {
        e.preventDefault();
        searchMovieParamsState.setSearchMovieParams(e.target.value);
    };

    return (
        <>
            <div className="">
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
                    movieState={movieState}
                />
            </div>

            <div className="">
                <div className="w-screen flex justify-between items-center p-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={logo}
                            alt="Main logo"
                            className="cursor-pointer"
                        />
                        <h1 className="hidden lg:block text-xl font-semibold">
                            Movie Mania
                        </h1>
                    </div>
                    <div className="hidden md:flex w-full max-w-sm items-center space-x-4">
                        <Input
                            type="email"
                            placeholder="What do you want to watch?"
                            value={searchMovieParamsState.searchMovieParams}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                    {!isLoggedIn ? (
                        <div className="flex items-center gap-2">
                            <Button
                                type="submit"
                                onClick={() => {
                                    setSignInDialogOpen(true);
                                }}
                            >
                                Sign in
                            </Button>
                            <Button
                                onClick={() => {
                                    setSignUpDialogOpen(true);
                                }}
                                className="bg-transparent hover:bg-transparent"
                            >
                                Sign up
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                className=""
                                onClick={() => {
                                    setAddMovieDialogOpen(true);
                                }}
                            >
                                Add Movie
                            </Button>
                            <Button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    setIsLoggedIn(false);
                                    alert('Logged out successfully');
                                }}
                                className="bg-transparent hover:bg-transparent"
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    <div className="flex md:hidden w-full max-w-sm items-center space-x-4">
                        <Input
                            type="email"
                            placeholder="What do you want to watch?"
                            value={searchMovieParamsState.searchMovieParams}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
