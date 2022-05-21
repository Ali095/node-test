import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../config';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { alertService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);
    const isSignedIn = localStorage.getItem("isSignedIn");

    useEffect(() => {
        axios.get(`${API_HOST}/api/v1/user/list`)
            .then(response => {
                response = response.data.result;
                setUsers(response)
            }).catch(err => {
                alertService.error(err.message);
            });
    }, []);

    return (!isSignedIn ? <Redirect exact to='/' /> :
        <div>
            <h1>Users</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '15%' }}>Name</th>
                        <th style={{ width: '15%' }}>Email</th>
                        <th style={{ width: '20%' }}>Calendar Link</th>
                        <th style={{ width: '20%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <a href={user.calendar_URL} className="link" target={'_blank'}>
                                    Open Calendar
                                </a>
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/${user.email}`} className="btn btn-sm btn-primary mr-1">Create Zoom Meeting</Link>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };