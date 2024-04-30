import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/components/AuthContext';
import { useState } from 'react';

export function SignIn({
    signInDialogOpen,
    setSignInDialogOpen
}: {
    signInDialogOpen: boolean;
    setSignInDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { setIsLoggedIn } = useAuth()
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch(
            'http://localhost:3000/api/v1/users/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }
        );
        if(response.status === 200){
            const result = await response.json()
            localStorage.setItem('token', result.token)
            setIsLoggedIn(true)
            setSignInDialogOpen(false)
        }
        else{
            alert('Invalid email or password')
        }
    };

    return (
        <Dialog open={signInDialogOpen} onOpenChange={setSignInDialogOpen}>
            <DialogContent className="h-[35vh] w-[30vw] sm:max-w-[1025px] p-0 bg-transparent/50 overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold pb-4 pt-2">
                            Sign In
                        </h1>
                        <div className="flex flex-col gap-4">
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
                            <Button type="submit" className="w-[40%] mx-auto">
                                Sign In
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
