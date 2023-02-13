import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { CheckCircle, Edit, Eye, Trash2, XSquare } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/auth/store';

function AdminPortal() {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.auth.data);

    useEffect(() => {
        console.log('call use effect');
        dispatch(getAllUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div>
            <Container className="mt-5">
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Ref No.</th>
                            <th className="">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{user?.fullName}</td>
                                <td>{user?.email}</td>
                                <td>{user?.contactNumber}</td>
                                <td>
                                    <p
                                        className={`${
                                            user?.isApproved ? 'text-success' : 'text-danger'
                                        } fw-bold `}
                                    >
                                        {user?.isApproved ? 'Approved' : 'Pending'}
                                    </p>
                                </td>
                                <td>LYP24PC2WM</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Edit size={18} className="text-info" />
                                        <Trash2 size={18} className="text-danger" />
                                        <CheckCircle size={18} className="text-primary" />
                                        <XSquare size={18} className="text-warning" />
                                        <Eye size={18} className="text-success" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default AdminPortal;
