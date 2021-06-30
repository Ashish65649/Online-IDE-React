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

function triggerFileExplorer() {
    var obj = document.querySelector('#inp > input');
    // Triggering hidden input for reading file.
    obj.click();
}

function loadFile(event) {
    var fr = new FileReader();
    fr.onload = function() {
        document.querySelector('#input').value = fr.result ;
    }
    fr.readAsText(event.target.files[0]);
}

function download() {
    let text = document.querySelector('#foutput').innerHTML ;
    if(text.length > 0) {
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
}

function Body() {
    return (
        <>
            <div className="body">
                <div id="editor"></div>
                <div className="inp-out">
                    <div id="inp"> 
                        <span> Input </span>
                        <i onClick={() => { func('#input') }} style={{position: 'absolute',right:'0.8rem'}} className="fas fa-copy crs small"></i>
                        <i onClick={ triggerFileExplorer } style={{position: 'absolute',right:'2.8rem'}} className="fa fa-folder-open crs small" aria-hidden="true"></i>
                        <input accept="text/plain" type="file" onChange={event => loadFile(event)} style={{display: 'none'}}/>
                    </div>
                    <textarea type="text" id="input" style={obj} placeholder="Enter input here..."></textarea>
                    <div id="out"> 
                        <span className="small"> Output : </span>
                        <i onClick={() => { func('#output') }} style={{position: 'absolute',right:'0.8rem'}} className="fas fa-copy crs small"></i>
                        <i onClick={download} style={{position: 'absolute',right:'2.8rem'}} className="fa fa-download crs small" aria-hidden="true"></i>
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