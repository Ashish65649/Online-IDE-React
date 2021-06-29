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
                    <p> Input </p>
                    <textarea id="input" style={obj} placeholder="Enter input here..."></textarea>
                    <p> Output </p>
                    <div id="output" style={obj}>
                        <pre id="foutput"> </pre>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Body;