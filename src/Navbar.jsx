import React, { useEffect, useState } from 'react';
import './Navbar.css';
import javaCode , {py , js , c , cpp} from './DummyCodes';

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

    fetch('https://online-code-runner.herokuapp.com/submit' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(response => response.json()).then(data => {
        console.log(data)
        if(data.memory === null && data.cpuTime === null) {
            data.memory = 0
            data.cpuTime = 0
        }
        let memTime = '\n\n[Memory: ' + data.memory + ' kb] [cpuTime: ' + data.cpuTime + ' ms]';
        document.querySelector('#foutput').innerHTML = data.output + memTime;
        document.querySelector('.btn').style.width = '5rem';
        document.querySelector('.btn').innerHTML = 'Run';
    }).catch(error => console.log(error.message))
}

function Navbar() {

    const [value,setValue] = useState("16");

    useEffect(() => {
        window.editor.setValue(c);
    }, []);

    function range(event) {
        setValue(event.target.value);
        let font = document.querySelector('input').value / 16 ;
        document.querySelector('#editor').style.fontSize = font + 'rem';
    }   
    
    function sampleCode(language) {
        if(language === 'java') {
            window.editor.setValue(javaCode);
        }
        else if(language === 'python') {
            window.editor.setValue(py);
        }
        else if(language === 'javascript') {
            window.editor.setValue(js);
        }
        else if(language === 'c') {
            window.editor.setValue(c);
        }
        else if(language === 'cpp') {
            window.editor.setValue(cpp);
        }
    }

    return (
        <React.Fragment>
            <div className="navbar">
                <p className="title"> OnlineIDE </p>
                <input onInput={range} type="range" min="12" max="30" value={value} step="1"/>
                <button className="btn" onClick={() => { getCode() }}>Run</button>
                <select id="languages" className="dropdown" onChange={(event) => {
                        var v = document.getElementById('languages').value;
                        sampleCode(v);
                        if(v === 'c' || v === 'cpp') {
                            v = 'c_cpp';
                        }
                        window.editor.session.setMode("ace/mode/" + v);
                    }}>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="javascript">Javascript</option>
                </select>
                {/* <i className="fa fa-cog settings" aria-hidden="true"></i> */}
            </div>
        </React.Fragment>
    );
}

export default Navbar;