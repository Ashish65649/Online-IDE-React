import React from 'react';
import './Body.css';

let obj = {
    fontSize: '1.1rem',
    padding: '5px'
}

function copy(containerid) {
    if(containerid === '#editor') {
        navigator.clipboard.writeText(window.editor.getSession().getValue());
    }
    else if(containerid === '#input') {
        navigator.clipboard.writeText(document.querySelector(containerid).value);
    }
    else {
        navigator.clipboard.writeText(document.querySelector(containerid).innerHTML);
    }  
}

function triggerFileExplorer(containerid) {
    var obj = document.querySelector(containerid);
    // Triggering hidden input for reading file.
    obj.click();
}

function loadFile(event,id) {
    var fr = new FileReader();

    fr.addEventListener('loadend' , function() {
        if(id === '#inp > input')
            document.querySelector('#input').value = fr.result ;
        else
            window.editor.setValue(fr.result) ;
    })

    fr.readAsText(event.target.files[0]);
}

function download(id) {
    let fileName ;
    let text ;
    if(id === '#editor') {
        fileName = 'code.txt';
        text = window.editor.getSession().getValue(); 
    }
    else {
        fileName = 'output.txt';
        text = document.querySelector(id).innerHTML;
    }

    if(text.trim().length > 0) {
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
                {/* <div className="tab-text"> 
                    <i onClick={() => { copy('#editor')}} className="fas fa-copy crs small"></i>
                    <i onClick={() => { download('#editor')}} className="fa fa-download crs small" aria-hidden="true"></i>
                    <i onClick={() => { triggerFileExplorer('.tab-text > input')}} className="fa fa-folder-open crs small" aria-hidden="true"></i>
                    <input accept="text/plain" type="file" onChange={event => loadFile(event,'.tab-text > input')} style={{display: 'none'}}/>
                </div> */}
                <div id="editor"></div>
                <div className="inp-out">
                    <div id="inp"> 
                        <span> Input </span>
                        <i className="fa fa-ellipsis-v crs small" style={{position: 'absolute',right:'0.8rem'}} aria-hidden="true"></i>
                        <i onClick={() => { copy('#input') }} style={{position: 'absolute',right:'2.6rem'}} className="fas fa-copy crs small"></i>
                        <i onClick={() => { triggerFileExplorer('#inp > input') } } style={{position: 'absolute',right:'4.8rem'}} className="fa fa-folder-open crs small" aria-hidden="true"></i>
                        <input accept="text/plain" type="file" onChange={event => loadFile(event ,'#inp > input')} style={{display: 'none'}}/>
                    </div>
                    <textarea type="text" id="input" style={obj} placeholder="Enter input here..."></textarea>
                    <div id="out"> 
                        <span className="small"> Output : </span>
                        <i onClick={() => { copy('#foutput') }} style={{position: 'absolute',right:'0.8rem'}} className="fas fa-copy crs small"></i>
                        <i onClick={() => { download('#foutput') }} style={{position: 'absolute',right:'2.8rem'}} className="fa fa-download crs small" aria-hidden="true"></i>
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