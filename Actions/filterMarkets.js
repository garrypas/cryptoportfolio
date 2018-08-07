import _ from 'lodash';

export default function (args = {}, dispatch) {
    const searchTextUpperCase = args.searchText.toUpperCase();
    let actionArgs = { 
        type: 'FILTER_MARKETS',
        suggestions: _.filter(args.items, name => searchTextUpperCase.length 
            && name.toUpperCase().includes(searchTextUpperCase)),
    };
    dispatch(actionArgs);
    return actionArgs;
};