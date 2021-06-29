import React from 'react';
import './Navbar.css';

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
    if(lang.trim() === 'c_cpp') {
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
        document.querySelector('#foutput').innerHTML = data.output ;
        document.querySelector('.btn').style.width = '5rem';
        document.querySelector('.btn').innerHTML = 'Run';
    }).catch(error => console.log(error.message))
}

function Navbar() {
    return (
        <React.Fragment>
            <div className="navbar">
                <p className="title"> OnlineIDE </p>
                <button className="btn" onClick={() => { getCode() }}>Run</button>
                <select id="languages" className="dropdown" onChange={(event) => {
                        var v = document.getElementById('languages').value;
                        window.editor.session.setMode("ace/mode/" + v);
                    }}>
                    <option value="c_cpp">C</option>
                    <option value="c_cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="javascript">Javascript</option>
                </select>
            </div>
        </React.Fragment>
    );
}

export default Navbar;