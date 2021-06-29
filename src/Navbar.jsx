import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <React.Fragment>
            <div className="navbar">
                <p className="title"> OnlineIDE </p>
                <button className="btn">Run</button>
                <select className="dropdown">
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                </select>
            </div>
        </React.Fragment>
    );
}

export default Navbar;