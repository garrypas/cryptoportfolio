import _ from 'lodash';

export default function (args = {}, dispatch) {
    const searchTextUpperCase = args.searchText.toUpperCase();
    let actionArgs = { 
        type: 'FilterMarkets',
        suggestions: _.filter(args.items, name => searchTextUpperCase.length 
            && name.toUpperCase().includes(searchTextUpperCase)),
    };
    dispatch(actionArgs);
    return actionArgs;
};