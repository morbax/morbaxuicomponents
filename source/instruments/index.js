// Validate length of string by params
export const validateLength = (text, minLength, maxLength) => {
    if (typeof text !== 'string') {
        throw new Error('text should be string');
    } else if (typeof minLength !== 'number') {
        throw new Error('minLength should be number');
    } else if (typeof maxLength !== 'number') {
        throw new Error('maxLength should be number');
    }

    return (!text || text.length < minLength || text.length > maxLength);
};

// Validate variable by regular expression
export const validateRegExp = (variable, reqexp) => {
    if (!(reqexp instanceof RegExp)) {
        throw new Error('reqexp should be RegExp');
    }
    return (reqexp.test(variable));
};

// Return name of component
export const getDisplayName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component';

// Group array of object to array of arrays with duplicate params in callback
// Example: groupArrayByProperties([], (item) => [item.name]) // Group object by name
export const groupArrayByProperties = (array, cb) => {
    let groups = {};

    if (typeof array !== 'object' || !Array.isArray(array)) {
        throw new Error('First argument of groupArrayByProperties function should be a Array');
    } else if (typeof cb !== 'function') {
        throw new Error('Second argument of groupArrayByProperties function should be a function');
    }

    array.forEach((item) => {
        const group = JSON.stringify(cb(item));

        groups[group] = groups[group] || [];
        groups[group].push(item);
    });

    return (Object.keys(groups).map((group) => groups[group]));
};

// Memoize function (by Odin by Tor use your brain)
export const memoize = (fn) => {
    if (typeof fn !== 'function') {
        throw new Error('Function memoize works only with function as arguments');
    }

    let previousArgument = null;
    let previousResult = null;

    return (argument) => {
        if (argument === previousArgument) {
            return (previousResult);
        }

        previousArgument = argument;
        previousResult = fn.call(this, argument);

        return (previousResult);
    }
};

// Get random string to set unique of element
export const getUniqueID = (length = 15) => {
    if (typeof length !== 'number') {
        throw new Error('The function argument should be a number!');
    }

    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return (text);
};

// Fet origin url for API
export const getOriginURLforAPI = () => {
    const { origin } = location;

    return (origin);
};
