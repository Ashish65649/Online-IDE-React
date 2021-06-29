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
                    <textarea id="input" style={obj} placeholder="Enter input here..."></textarea>
                    <textarea id="output" style={obj} placeholder="Output..." readOnly={true}></textarea>
                </div>
            </div>
        </>
    );
}

export default Body;