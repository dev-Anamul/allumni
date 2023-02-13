import React from 'react';
import { Alert, Button, Card, Col, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeSingupAlert, signup } from '../redux/auth/store';

function Signup() {
    const [photo, setPhoto] = React.useState('');
    const [userInfo, setUserInfo] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });

    // ! hooks and variables
    const dispatch = useDispatch();

    // ! get data from store
    const { signupMessage, signupAlert } = useSelector((state) => state.auth);

    const resetForm = () => {
        setUserInfo({
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '',
            password: '',
            confirmPassword: '',
            gender: '',
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleImageChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('firstName', userInfo.firstName);
        formData.append('lastName', userInfo.lastName);
        formData.append('email', userInfo.email);
        formData.append('contactNumber', userInfo.contactNumber);
        formData.append('password', userInfo.password);
        formData.append('confirmPassword', userInfo.confirmPassword);
        formData.append('gender', userInfo.gender);
        dispatch(signup(formData));
        resetForm();
    };

    return (
        <div style={{ backgroundColor: '#ECF9FF' }} className="h-100">
            <Container className="d-flex justify-content-center align-items-center h-100">
                <Col md="6" className="">
                    <Card className="border-0 shadow p-md-4">
                        <h1 className="text-center mb-0">Signup</h1>
                        <hr className="devide" />
                        <Form onSubmit={handleSubmit} className="my-3">
                            <div className="d-flex gap-4 mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    name="firstName"
                                    value={userInfo.firstName}
                                    onChange={handleChange}
                                    className="rounded-0 px-3 py-2"
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    name="lastName"
                                    value={userInfo.lastName}
                                    onChange={handleChange}
                                    className="rounded-0 px-3 py-2"
                                />
                            </div>
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
                            <div className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Enter confirm password"
                                    name="confirmPassword"
                                    value={userInfo.confirmPassword}
                                    onChange={handleChange}
                                    className="rounded-0 px-3 py-2"
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter contact number"
                                    name="contactNumber"
                                    value={userInfo.contactNumber}
                                    onChange={handleChange}
                                    className="rounded-0 px-3 py-2"
                                />
                            </div>
                            <div className="mb-3 d-flex gap-4">
                                <Form.Check>
                                    <Form.Check.Input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        onChange={handleChange}
                                    />
                                    <Form.Check.Label>Male</Form.Check.Label>
                                </Form.Check>
                                <Form.Check>
                                    <Form.Check.Input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        onChange={handleChange}
                                    />
                                    <Form.Check.Label>Female</Form.Check.Label>
                                </Form.Check>
                                <Form.Check>
                                    <Form.Check.Input
                                        type="radio"
                                        name="gender"
                                        value="other"
                                        onChange={handleChange}
                                    />
                                    <Form.Check.Label>Other</Form.Check.Label>
                                </Form.Check>
                            </div>
                            <div className="mb-3">
                                <Form.Control
                                    type="file"
                                    name="photo"
                                    onChange={handleImageChange}
                                    className="rounded-0"
                                />
                            </div>
                            <div className="mb-3">
                                <Link to="/login" className="text-decoration-none">
                                    Already have an account?
                                </Link>
                            </div>
                            <div className="mb-3 gap-2 d-flex">
                                <Button type="submit">Submit</Button>
                                <Button>Reset</Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Container>
            <Alert
                show={signupAlert}
                variant="success"
                className="position-fixed end-0 m-3"
                style={{ top: '4rem', width: '32rem' }}
                onClose={() => {
                    dispatch(closeSingupAlert());
                }}
                dismissible
            >
                <Alert.Heading className="">{signupMessage?.status}</Alert.Heading>
                <p>{signupMessage?.message}</p>
            </Alert>
        </div>
    );
}

export default Signup;
