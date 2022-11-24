import './CodeEditor.css'
import React from 'react';



class CodeEditor extends React.Component{
    constructor(){
        super();
        this.state = {
            color: 'white'
        }
    }

    render() {
        return (
            <textarea spellcheck="false" className='codeEditor'
                style={{width: '90%', minHeight: '200px', color: this.state.color}} onKeyDown={(event) => {
                    if (event.key === 'Tab' && !event.shiftKey){      
                    event.preventDefault();
                    event.target.value += '    ';        
                    }
                    // else if (event.key === '<')
                    // {                       
                    //     event.target.value += '<'
                    // }
                }}
            />
        );
    }
}

export default CodeEditor;