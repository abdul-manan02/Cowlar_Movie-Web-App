import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from '@/assets/logo.png';

export default function Header() {
    return (
        <div className="flex justify-between items-center p-6">
            <div className='flex items-center gap-4'>
                <img src={logo} alt="Main logo" />
                <h1 className='text-xl'>Movie Mania</h1>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-4">
                <Input type="email" placeholder="What do you want to watch?" />
                <Button type="submit">Search</Button>
            </div>
            <div className="flex gap-2">
                <Button className="bg-transparent hover:bg-transparent">
                    Log in
                </Button>
                <Button>Sign up</Button>
            </div>
        </div>
    );
}
