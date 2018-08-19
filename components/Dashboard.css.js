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

export default css;