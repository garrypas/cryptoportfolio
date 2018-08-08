"use strict";

module.exports = {
    func: (state = {}, dispatch) => {
        console.log('called real');
        const myCurrencies = AsyncStorageArrayWrapper.getItem('myCurrencies').then(val => {
            dispatch({
                type: 'GET_MY_CURRENCIES',
                myCurrencies: val,
            });
        });
    }
};