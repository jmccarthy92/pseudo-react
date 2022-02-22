import dispatcher from './dispatcher.js';

export function createElement(type, props, ...children) {
    const element = { 
        type, 
        props, 
        children,
    };

    Object.freeze(element);
    Object.freeze(element.props);

    return element;
}

export function useState(initialValue) {
    // check if there is an implementation for this
    return dispatcher.useState(initialValue);
}

export function useRef(initialValue) {
    return dispatcher.useRef(initialValue);
}

export function useEffect(callback, dependencies) {
    return dispatcher.useEffect(callback, dependencies);
}

export function useMemo(callback, dependencies) {
    return dispatcher.useMemo(callback, dependencies);
}