import React from 'react';
import './Body.css';

function Body() {
    return (
        <>
            <div className="body">
                <textarea id="code"></textarea>
                <div className="inp-out">
                    <textarea id="input"></textarea>
                    <textarea id="output" readOnly></textarea>
                </div>
            </div>
        </>
    );
}

export default Body;