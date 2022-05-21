import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        localStorage.getItem("isSignedIn") && (
            <nav className="navbar navbar-expand navbar-dark bg-dark" >
                <div className="navbar-nav">
                    <NavLink to="/users" className="nav-item nav-link">Users</NavLink>
                    <NavLink to="/meetings" className="nav-item nav-link">My Meetings</NavLink>
                    <NavLink to="/logout" className="nav-item nav-link">Logout</NavLink>
                </div>
            </nav>)
    );
}

export { Nav };