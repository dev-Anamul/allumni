import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PrivateRouter from './components/private-route/PrivateRouter';
import About from './pages/About';
import AdminPortal from './pages/AdminPortal';
import Contact from './pages/Contact';
import ForgottPassword from './pages/ForgottPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/forgott-password" element={<ForgottPassword />} />
                <Route path="/*" element={<PrivateRouter />}>
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="dashboard/admin" element={<AdminPortal />} />
                </Route>
            </Routes>
        </Layout>
    );
}

export default App;
