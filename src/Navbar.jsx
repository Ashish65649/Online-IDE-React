import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <React.Fragment>
            <div className="navbar">
                <p className="title"> OnlineIDE </p>
                <button className="btn">Run</button>
                <select className="dropdown">
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="py">Python</option>
                    <option value="js">Javascript</option>
                </select>
            </div>
        </React.Fragment>
    );
}

export default Navbar;