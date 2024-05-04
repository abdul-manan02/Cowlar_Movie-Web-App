import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/components/AuthContext';
import { useState } from 'react';
import { signIn } from '@/apiCalls/user-apiCalls';

export function SignIn({
    signInDialogOpen,
    setSignInDialogOpen
}: {
    signInDialogOpen: boolean;
    setSignInDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { setIsLoggedIn } = useAuth();

    const setStatesToEmpty = () => {
        setEmail('');
        setPassword('');
    }

    const closeDialog = () => {
        setStatesToEmpty();
        setSignInDialogOpen(false);
    }
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const { success, error } = await signIn(email, password);
            if (success) {
                setIsLoggedIn(true);
                setStatesToEmpty();
                setSignInDialogOpen(false);
            } else {
                alert(error);
            }
        } catch (error) {
            console.error('Error handling form submission:', error);
            alert('An error occurred while signing in');
        }
    };

    return (
        <Dialog open={signInDialogOpen} onOpenChange={closeDialog}>
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
                                Sign In
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
