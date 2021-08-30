import React, { useEffect, useState } from 'react';
import './Navbar.css';
import javaCode , {py , js , c , cpp , langs} from './DummyCodes';

function Lang(lang,index) {
        let option = <option key={index} value={lang.value}> {lang.lang} </option>
        return option;
}

function showToast(msg,color) {
    var x = document.querySelector("#snackbar");
    x.innerHTML = msg;
    x.style.backgroundColor = color;
    x.setAttribute('class', 'show');
    setTimeout(function(){
        x.removeAttribute("class");  
    }, 3000);
}

function getCode() {
    var code = window.editor.getSession().getValue();
    if(code.trim().length === 0) {
        return false;
    }
    document.querySelector('.btn').style.width = '7rem';
    document.querySelector('.btn').innerHTML = 'Running';
    var version = '0';
    var input = document.querySelector('#input').value;
    var lang = document.querySelector('#languages').value;
    if(lang.trim() === 'c') {
        lang = 'c'; 
    }
    else if(lang.trim() === 'cpp') {
        lang = 'cpp';
    }
    else if(lang.trim() === 'python'){
        lang = 'python3';
    }
    else if(lang.trim() === 'javascript'){
        lang = 'nodejs';
    }

    let obj = {
        'script' : code,
        'language' : lang,
        'versionIndex' : version,
        'stdin' : input
    }
    
    fetch('https://mycode-runner.herokuapp.com/submit' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(response => response.json()).then(data => {
        if(data.memory === null && data.cpuTime === null) {
            data.memory = 0
            data.cpuTime = 0
            showToast('Compilation Error!' , 'red');            
        }
        else {
            showToast('Execution done!','#32CD32');
        }
        let memTime = '\n\n[Memory: ' + data.memory + ' kb] [cpuTime: ' + data.cpuTime + ' ms]';
        document.querySelector('#foutput').innerHTML = data.output + memTime;
        document.querySelector('.btn').style.width = '5rem';
        document.querySelector('.btn').innerHTML = 'Run';
    }).catch(error => console.log(error.message))
}

function Navbar() {

    useEffect(() => {
        setInterval(() => {
            let currLang = document.querySelector('#languages').value ;
            sessionStorage.setItem(currLang,window.editor.getSession().getValue());
        } , 500);

        if(sessionStorage.getItem('currentLang') != null) {
            let v ;
            if(sessionStorage.getItem('currentLang') === 'c' || sessionStorage.getItem('currentLang') === 'cpp') {
                v = 'c_cpp';
            }
            else {
                v = sessionStorage.getItem('currentLang');
            }
            if(sessionStorage.getItem('font') != null) {
                setValue(sessionStorage.getItem('font'));
                font(sessionStorage.getItem('font')/16);
            }
            window.editor.session.setMode("ace/mode/" + v);
            document.querySelector('#languages').value = sessionStorage.getItem('currentLang');
            window.editor.setValue(sessionStorage.getItem(sessionStorage.getItem('currentLang')));
        }
        else {
            sessionStorage.setItem('c',c);
            sessionStorage.setItem('currentLang', 'c');
            window.editor.setValue(sessionStorage.getItem(sessionStorage.getItem('currentLang')));
        }
    } , []);

    const [value,setValue] = useState('16');

    function font(font) {
        document.querySelector('#editor').style.fontSize = font + 'rem';
    }

    function range(event) {
        sessionStorage.setItem('font' , event.target.value);
        setValue(event.target.value);
        font(event.target.value / 16);
    }   

    function sampleCode(language , prevLang) {

        if(language === 'java') {
            if(sessionStorage.getItem('java') != null) {
                window.editor.setValue(sessionStorage.getItem('java'));
            }
            else {
                window.editor.setValue(javaCode);
            }
        }
        else if(language === 'python') {
            if(sessionStorage.getItem('python') != null) {
                window.editor.setValue(sessionStorage.getItem('python'));
            }
            else {
                window.editor.setValue(py);
            }
        }
        else if(language === 'javascript') {
            if(sessionStorage.getItem('javascript') != null) {
                window.editor.setValue(sessionStorage.getItem('javascript'));
            }
            else {
                window.editor.setValue(js);
            }
        }
        else if(language === 'c') {
            if(sessionStorage.getItem('c') != null) {
                window.editor.setValue(sessionStorage.getItem('c'));
            }
            else {
                window.editor.setValue(c);
            }
        }
        else if(language === 'cpp') {
            if(sessionStorage.getItem('cpp') != null) {
                window.editor.setValue(sessionStorage.getItem('cpp'));
            }
            else {
                window.editor.setValue(cpp);
            }
        }
    }

    return (
        <React.Fragment>
            <div className="navbar">
                <p className="title"> OnlineIDE </p>
                <input style={{outline: '0'}} onInput={range} type="range" min="12" max="30" value={value} step="1"/>
                <button className="btn" onClick={() => { getCode() }}>Run</button>
                <select id="languages" className="dropdown" data-prev='c' onChange={(event) => {
                        var prevLang = document.querySelector('#languages').dataset.prev ;
                        var v = document.getElementById('languages').value;
                        sessionStorage.setItem('currentLang' , v);
                        document.querySelector('#languages').dataset.prev = v ;
                        sampleCode(v,prevLang);
                        if(v === 'c' || v === 'cpp') {
                            v = 'c_cpp';
                        }
                        window.editor.session.setMode("ace/mode/" + v);
                    }}>
                    {langs.map(Lang)}
                </select>
                {/* <i className="fa fa-cog settings" aria-hidden="true"></i> */}
            </div>
        </React.Fragment>
    );
}

export default Navbar;
