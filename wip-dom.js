let hooks = [];
let idx = 0;

export function useMemo(callback, deps) {

}

export function useEffect(callback, deps) {
    const previousDeps = hooks[idx];
    let changed = true;
    
    if(previousDeps){
        changed = deps.some((dep, idx) => 
            !Object.is(dep, previousDeps[idx])
        )
    }

    if(changed) callback();
    hooks[idx] = deps;
}

export function useState(initialValue) {
    let state = hooks[idx] || initialValue;
    const _idx = idx;

    function setState(newValue) {
        hooks[_idx] = newValue;
        render();
    }

    idx++;
    return [state, setState];
}

export function useRef(initialValue = null) {
    const _idx = idx;
    if(!hooks[_idx]) {
        hooks[_idx] = Object.seal({ current: initialValue});
    }

    idx++;
    return hooks[_idx];
}

function renderElement(element) {
  const { type, props, children } = element;

  // Support components factory functions.
  if (typeof type === 'function') {
     return renderElement(type(props));
  }

  // Create DOM Element Tree
  if (typeof type === "string") {
    const domElement = document.createElement(type);

    // Handle Children
    children.forEach(child => {
      if (typeof child === "string") {
        domElement.appendChild(document.createTextNode(child));
      } else {
        domElement.appendChild(renderElement(child));
      }
    });

    // handle events
    for(let prop in props) {
        if(props.hasOwnProperty(prop)) {
            if(prop.startsWith('on')) {
                const eventName = prop.substring(2).toLowerCase();
                domElement.addEventListener(eventName, props[prop])
            }
        }
    }

    return domElement;
  }
}

let _currentApp = null;
let _element = null;
let _container = null;


function render(element = _element, container = _container) {
    const app = renderElement(element)

    _element = element;
    _container = container;

    _currentApp ? 
        container.replaceChild(app, _currentApp)     
        : container.appendChild(app);
    
    _currentApp = app;
    idx = 0;
}

export default {
    render,
}