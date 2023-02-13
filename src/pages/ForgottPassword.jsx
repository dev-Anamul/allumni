import React from 'react';
import { Button, Card, Col, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ForgottPassword() {
    const [userInfo, setUserInfo] = React.useState({
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div style={{ backgroundColor: '#ECF9FF' }} className="h-100">
            <Container className="d-flex justify-content-center align-items-center h-100">
                <Col md="4" className="">
                    <Card className="border-0 shadow px-md-4 pt-md-4">
                        <h1 className="text-center mb-0">Forgott Password</h1>
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
                            <div className="d-flex justify-content-between px-2 align-items-center mb-3">
                                <Link to="/login" className="text-decoration-none">
                                    Back to login?
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
        </div>
    );
}

export default ForgottPassword;
