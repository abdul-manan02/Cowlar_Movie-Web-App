import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Routes from './Routes';

const App = () => {

    return (
        <Router>
            <AuthProvider>
                <Routes/>
            </AuthProvider>
        </Router>
    );
};

export default App;
