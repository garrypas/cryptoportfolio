"use strict";

import styles from './styles.css';

const css = {
    ...styles,
    flatListStyle: {
        width: '100%',
        flex: 1,
    },

    flatListItemStyle: {
        padding: 20,
        flex: 1,
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        flexDirection:"row"
    },
    itemName: {
        width:'50%',
        flex: 1,
        justifyContent: 'flex-start',
    },

    itemNameText: {
        justifyContent: 'flex-start',
        fontWeight:'bold'
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