import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function SignIn({
    signInDialogOpen,
    setSignInDialogOpen
}: {
    signInDialogOpen: boolean;
    setSignInDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert('Sign in');
    };

    return (
        <Dialog open={signInDialogOpen} onOpenChange={setSignInDialogOpen}>
            <DialogContent className="h-[35vh] w-[30vw] sm:max-w-[1025px] p-0 bg-transparent/50 overflow-y-auto">
                <form action="submit" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold pb-4 pt-2">Sign In</h1>
                        <div className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-[20vw] p-2 rounded-md text-black"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-[20vw] p-2 rounded-md text-black"
                            />
                            <Button type="submit" className='w-[40%] mx-auto'>Sign In</Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
