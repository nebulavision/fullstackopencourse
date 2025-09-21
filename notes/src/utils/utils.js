const isRunningOnLocal = () => {
    return window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'  
};

export default isRunningOnLocal;