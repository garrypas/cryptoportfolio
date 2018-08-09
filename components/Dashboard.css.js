"use strict";

import styles from './common/styles.css';

let css = {
    ...styles,
    itemName: {
        width:'50%',
        flex: 1,
        justifyContent: 'flex-start',
    },
    itemPrice: {
        width:'50%',
        flex: 1,
    },

    itemPriceText: {
        justifyContent: 'flex-end',
    }
};

css.itemPriceTextUp = {  color: 'green', fontWeight: 'bold' };
css.itemPriceTextDown = { color: 'red', fontWeight: 'bold' };

export default css;