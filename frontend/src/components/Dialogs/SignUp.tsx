import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function SignUp({
    signUpDialogOpen,
    setSignUpDialogOpen
}: {
    signUpDialogOpen: boolean;
    setSignUpDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, username, password })
        });
        if(response.status === 200){
            alert('Successfuly Signed Up');
            setSignUpDialogOpen(false);
        } 
        else{
            alert('Error');
        }
    };

    return (
        <Dialog open={signUpDialogOpen} onOpenChange={setSignUpDialogOpen}>
            <DialogContent className="h-[55vh] w-[30vw] sm:max-w-[1025px] p-0 bg-transparent/50 overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold pb-4 pt-2">
                            Sign Up
                        </h1>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-[20vw] p-2 rounded-md text-black"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-[20vw] p-2 rounded-md text-black"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-[20vw] p-2 rounded-md text-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-[20vw] p-2 rounded-md text-black"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" className='w-[40%] mx-auto'>Sign Up</Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
