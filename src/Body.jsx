import React from 'react';
import './Body.css';

let obj = {
    fontSize: '1.1rem',
    padding: '5px'
}

function func(containerid) {
    if(containerid === '#output') {
        var elm = document.querySelector(containerid);
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(elm);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("Copy"); 
    }
    else {
        var txtArea = document.querySelector(containerid);
        txtArea.select();
        document.execCommand("Copy"); 
    }  
}

function download() {
    let text = document.querySelector('#foutput').innerHTML ;
    let fileName = 'output.txt';
    var element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(text));
    element.setAttribute('download',fileName);
    element.setAttribute('target','_blank');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function Body() {
    return (
        <>
            <div className="body">
                <div id="editor"></div>
                <div className="inp-out">
                    <div id="inp"> 
                        <span> Input </span>
                        <i onClick={() => { func('#input') }} style={{position: 'absolute',right:'0.8rem'}} className="fas fa-copy crs"></i>
                        <i style={{position: 'absolute',right:'2.8rem'}} className="fa fa-folder-open crs" aria-hidden="true"></i>
                        <input type="file" style={{display: 'none'}}/>
                    </div>
                    <textarea type="text" id="input" style={obj} placeholder="Enter input here..."></textarea>
                    <div id="out"> 
                        <span>Output</span>
                        <i onClick={() => { func('#output') }} style={{position: 'absolute',right:'0.8rem'}} className="fas fa-copy crs"></i>
                        <i onClick={download} style={{position: 'absolute',right:'2.8rem'}} className="fa fa-download crs" aria-hidden="true"></i>
                    </div>
                    <div id="output" style={obj}>
                        <pre id="foutput"></pre>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Body;