import React from 'react';
import './Body.css';

let obj = {
    fontSize: '1.1rem',
    padding: '5px'
}

function Body() {

    return (
        <>
            <div className="body">
                <div id="editor"></div>
                <div className="inp-out">
                    <textarea id="input" placeholder="Enter input here..." style={obj}></textarea>
                    <textarea id="output" readOnly style={obj} placeholder="Output..." style={obj}></textarea>
                </div>
            </div>
        </>
    );
}

export default Body;