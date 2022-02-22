/**
 * <div>
 *  <h1>Work in Progress</h1>
 *  <button>click me</button>
 *  </div>
 */
import {createElement, useState, useRef, useEffect} from './wip.js';
import WipDOM from './wip-dom.js';

function Button({label, click }) {
    return createElement('button', {
        onClick: click,
    }, label);
}

function App() { 

    const [title, setTitle] = useState("Work in progress");
    const [count, setCount] = useState(1);
    const off = useRef(false);

    useEffect(() => {
        console.log('use side effect of rendering app component')
    }, [title]);


    const increase = () => {
        !off.current && setCount(count + 1);
    }

    const toggleCounter = () => {
        off.current = true;
    }

    const changeTitle = () => {
        setTitle("New Title");
    }

    return createElement('div', null, 
        createElement('h1', null, title),  
        createElement('h1', null, String(count)),  
        createElement(Button, { label: '+', click: increase }),
        createElement(Button, { label: 'off', click: toggleCounter}),
        createElement(Button, { label: 'change title', click: changeTitle}));
};

WipDOM.render(createElement(App), document.getElementById('root'));