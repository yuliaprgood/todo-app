import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { HomePage } from './pages/home';
import { UsersPage } from './pages/users';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
        </Routes>
    );
}

export default App;
