import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/auth/store';

function Header() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
    };

    return (
        <Navbar bg="dark" variant="dark" className="fixed-top">
            <Container>
                <Nav className="mx-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    {!isAuthenticated && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">
                                Signup
                            </Link>
                        </li>
                    )}
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">
                            Contact
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                Profile
                            </Link>
                        </li>
                    )}
                    <li className="nav-item">
                        {!isAuthenticated ? (
                            <button
                                type="button"
                                className="nav-link bg-transparent border-0"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="nav-link bg-transparent border-0"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )}
                    </li>
                    {isAuthenticated && user.role === 'admin' && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/admin">
                                Admin
                            </Link>
                        </li>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
