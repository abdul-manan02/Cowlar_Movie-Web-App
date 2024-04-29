import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function SignUp({
    signUpDialogOpen,
    setSignUpDialogOpen
}: {
    signUpDialogOpen: boolean;
    setSignUpDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert('Sign Up');
    };

    return (
        <Dialog open={signUpDialogOpen} onOpenChange={setSignUpDialogOpen}>
            <DialogContent className="h-[45vh] w-[30vw] sm:max-w-[1025px] p-0 bg-transparent/50 overflow-y-auto">
                <form action="submit" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold pb-4 pt-2">Sign Up</h1>
                        <div className="flex flex-col gap-4">
                            <input
                                type="name"
                                placeholder="Name"
                                className="w-[20vw] p-2 rounded-md text-black"
                            />
                            <input
                                type="username"
                                placeholder="Username"
                                className="w-[20vw] p-2 rounded-md text-black"
                            />
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
                            <Button type="submit" className='w-[40%] mx-auto'>Sign Up</Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
