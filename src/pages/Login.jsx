import React, { useEffect } from 'react';
import { Alert, Button, Card, Col, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { closeLoginAlert, login } from '../redux/auth/store';

function Login() {
    const [userInfo, setUserInfo] = React.useState({
        email: '',
        password: '',
    });

    // ! hooks and variables
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ! get data from store
    const { isAuthenticated, loginError, loginAlert } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userInfo));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div style={{ backgroundColor: '#ECF9FF' }} className="h-100">
            <Container className="d-flex justify-content-center align-items-center h-100">
                <Col md="4" className="">
                    <Card className="border-0 shadow px-md-4 pt-md-4">
                        <h1 className="text-center mb-0">Login</h1>
                        <hr className="devide" />
                        <Form onSubmit={handleSubmit} className="my-3">
                            <div className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleChange}
                                    className="rounded-0 px-3 py-2"
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={userInfo.password}
                                    onChange={handleChange}
                                    className="rounded-0 px-3 py-2"
                                />
                            </div>
                            <div className="d-flex justify-content-between px-2 align-items-center mb-3">
                                <Link to="/forgott-password" className="text-decoration-none">
                                    Forgot password?
                                </Link>
                                <Link to="/signup" className="text-decoration-none">
                                    Signup as new user?
                                </Link>
                            </div>

                            <div className="mb-3 gap-2 d-flex pt-2">
                                <Button type="submit">Submit</Button>
                                <Button>Reset</Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Container>
            <Alert
                show={loginAlert}
                variant="danger"
                className="position-fixed end-0 m-3"
                style={{ top: '4rem', width: '32rem' }}
                onClose={() => {
                    dispatch(closeLoginAlert());
                }}
                dismissible
            >
                <Alert.Heading className="">{loginError?.status}</Alert.Heading>
                <p>{loginError?.message}</p>
            </Alert>
        </div>
    );
}

export default Login;
