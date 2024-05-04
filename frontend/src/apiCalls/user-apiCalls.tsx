export const signIn = async (email: string, password: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/users/signin`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }
        );
        if (response.status === 200) {
            const result = await response.json();
            localStorage.setItem('token', result.token);
            return { success: true };
        } else {
            return { success: false, error: 'Invalid email or password' };
        }
    } catch (error) {
        console.error('Error signing in:', error);
        return { success: false, error: 'An error occurred while signing in' };
    }
};

export const signUp = async (
    name: string,
    email: string,
    username: string,
    password: string
) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/users/signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, username, password })
            }
        );
        if (response.status === 200) {
            return { success: true };
        } else {
            return {
                success: false,
                error: 'An error occurred during sign-up'
            };
        }
    } catch (error) {
        console.error('Error signing up:', error);
        return { success: false, error: 'An error occurred during sign-up' };
    }
};