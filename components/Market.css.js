"use strict";

import styles from './common/styles.css';

const css = {
    ...styles,
    header: {
        flexDirection:"row",
        borderColor:'#000000',
        padding: 10,
    },


    body: {
        flexDirection:"column",
    },

    buttons: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'center',
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
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },

    breakdown: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },

    itemBreakdown: {
        ...styles.flatListStyle,
        width:'100%',
        flex: 1,
        flexDirection: 'row',
    },

    itemBreakdownExchange: {
        width:'40%',
        backgroundColor:'blue',
    },

    itemBreakdownMarket: {
        width:'40%',
        backgroundColor:'pink',
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