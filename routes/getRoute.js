const stringFormat = require('string-format');
import Routes from './Routes';

function getUrlTemplate(key) {
    const route = Routes[key];
    if(!route) {
        throw `Route matching key ${key} not found`;
    }
    return route;
}

export default function(...args) {
    const _args = args.slice();
    const routeKey = _args[0];
    let urlTemplate = getUrlTemplate(routeKey);
    _args[0] = urlTemplate;
    return stringFormat( ..._args );
};