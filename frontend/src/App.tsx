import { AuthProvider } from './components/AuthContext';
import HomePage from '@/components/HomePage';

function App() {
    return (
        <AuthProvider>
            <HomePage />
        </AuthProvider>
    );
}

export default App;
