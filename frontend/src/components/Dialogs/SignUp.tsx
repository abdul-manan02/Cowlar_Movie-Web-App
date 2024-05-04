import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { signUp } from '@/apiCalls/user-apiCalls';

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

    const setStatesToEmpty = () => {
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
    }
    
    const closeDialog = () => {
        setStatesToEmpty();
        setSignUpDialogOpen(false);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const { success, error } = await signUp(
                name,
                email,
                username,
                password
            );
            if (success) {
                alert('Successfully Signed Up');
                setStatesToEmpty();
                setSignUpDialogOpen(false);
            } else {
                alert(error);
            }
        } catch (error) {
            console.error('Error handling sign-up:', error);
            alert('An error occurred during sign-up');
        }
    };

    return (
        <Dialog open={signUpDialogOpen} onOpenChange={closeDialog}>
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
                                className="w-[20vw] p-2 rounded-md text-white bg-transparent"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="off"
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-[20vw] p-2 rounded-md text-white bg-transparent"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-[20vw] p-2 rounded-md text-white bg-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="off"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-[20vw] p-2 rounded-md text-white bg-transparent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                            />
                            <Button type="submit" className="w-[40%] mx-auto">
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
