import React from 'react';
import './Body.css';

let obj = {
    fontSize: '1.1rem',
    padding: '5px'
}

function showToast(msg,color) {
    var x = document.querySelector("#snackbar");
    x.style.backgroundColor = color;
    x.innerHTML = msg;
    x.setAttribute('class', 'show');
    setTimeout(function(){ 
        x.removeAttribute("class");
    }, 3000);
}

function copy(containerid) {
    if(containerid === '#editor' && window.editor.getSession().getValue().trim().length !== 0) {
        showToast('Copied successfully!' ,'#32CD32');
        navigator.clipboard.writeText(window.editor.getSession().getValue());
    }
    else if(containerid === '#input' && document.querySelector(containerid).value.trim().length !== 0) {
        showToast('Copied successfully!' ,'#32CD32');
        navigator.clipboard.writeText(document.querySelector(containerid).value);
    }
    else if(document.querySelector(containerid).innerHTML.trim().length !== 0) {
        showToast('Copied successfully!' ,'#32CD32');
        navigator.clipboard.writeText(document.querySelector(containerid).innerHTML);
    } 
    else {
        showToast('Nothing to copy!' ,'red');
    }
}

function triggerFileExplorer(containerid) {
    var obj = document.querySelector(containerid);
    obj.click();
}

function loadFile(event,id) {
    var fr = new FileReader();
    let fName ;
    fr.addEventListener('loadend' , function() {
        if(id === '#inp > input')
            document.querySelector('#input').value = fr.result ;
        else {
            let extension = fName.split('.').pop();
            let lang ;
            let flag = 0;
            if(extension === 'js') {
                flag = 1;
                lang = 'javascript';
                extension = 'javascript';
            }
            else if(extension === 'py') {
                flag = 1;
                lang = 'python';
                extension = 'python';
            }
            else if(extension === 'java') {
                flag = 1;
                lang = 'java';
            }
            else if(extension === 'c') {
                flag = 1;
                lang = 'c';
                extension = 'c_cpp';
            }
            else if(extension === 'cpp') {
                flag = 1;
                lang = 'cpp';
                extension = 'c_cpp';
            }
            if(flag === 1) {
                showToast(`${lang} language detected` ,'#32CD32');
                window.editor.session.setMode("ace/mode/" + extension);
                sessionStorage.setItem('currentLang',lang);
                document.querySelector('#languages').value = lang;
                window.editor.setValue(fr.result) ;
            }
            else {
                showToast(`Invalid file extension` ,'red');
            }
        }
    })
    if(event.target.files.length === 1) {
        fName = event.target.files[0].name ;
        fr.readAsText(event.target.files[0]);
    }
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

function mouseMovement() {
    document.querySelector('#line-no').innerHTML = window.editor.selection.getCursor().row + 1;
    document.querySelector('#col-no').innerHTML = window.editor.selection.getCursor().column + 1;
}

function Body() {
    return (
        <>
            <div className="body">
                <div className="tab-text"> 
                    <span onClick={() => { copy('#editor')}} className="fas fa-copy crs small"></span>
                    <i onClick={() => { download('#editor')}} className="fa fa-download crs small" aria-hidden="true"></i>
                    <i onClick={() => { triggerFileExplorer('.tab-text > input')}} className="fa fa-folder-open crs small" aria-hidden="true"></i>
                    <span style={{borderBottom : '1px solid white' , marginTop: '1rem' ,fontSize: '0.9rem'}}> Ln </span>
                    <span id="line-no" style={{fontSize: '0.9rem'}}>1</span>
                    <span style={{borderBottom : '1px solid white' , marginTop: '1rem' ,fontSize: '0.9rem'}}> Col </span>
                    <span id="col-no" style={{fontSize: '0.9rem'}}>1</span>
                    <input accept="text/plain" type="file" onChange={event => loadFile(event,'.tab-text > input')} style={{display: 'none'}}/>
                </div>
                <div id="editor" onMouseDown = {(e) => mouseMovement() } onKeyUp = {(e) => mouseMovement() } tabIndex="0"></div>
                <div className="inp-out">
                    <div id="inp"> 
                        <span> Input </span>
                        {/* <i className="fa fa-ellipsis-v crs small" style={{position: 'absolute',right:'0.8rem'}} aria-hidden="true"></i> */}
                        <i onClick={() => { copy('#input') }} style={{position: 'absolute',right:'0.8rem'}} className="fas fa-copy crs small"></i>
                        <i onClick={() => { triggerFileExplorer('#inp > input') } } style={{position: 'absolute',right:'2.8rem'}} className="fa fa-folder-open crs small" aria-hidden="true"></i>
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
                <div id="snackbar"></div>
            </div>
        </>
    );
}

export default Body;