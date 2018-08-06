"use strict";

import styles from './styles.css';

const css = {
    ...styles,
    header: {
        flexDirection:"row",
        borderColor:'#000000',
        borderBottomWidth: 1,
        display:'flex',
        height: 100,
    },


    body: {
        flexDirection:"column",
        flex: 1,
    },

    buttons: {
        flexDirection:"row",
        flex: 1,
        marginTop: 100,
    },

    icon: {
        justifyContent: 'flex-start',
        width: 64,
        height: 64,
    },

    iconImage: {
        width: 64,
        height: 64,
    },

    itemPriceContainer: {
        justifyContent: 'flex-end',
        width: '100%',
        height: 80,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },

    itemPrice: {
        fontSize: 24,
        textAlign: 'right',
        flex: 1,
    },

    itemOtherInfo: {
        textAlign: 'right',
        flex: 1,
        fontSize: 10,
    },
}

export default css;