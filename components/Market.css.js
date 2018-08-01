"use strict";

import styles from './styles.css';

const css = {
    ...styles,
    header: {
        padding: 20,
        height: 100,
        flexDirection:"row",
        borderBottomWidth: 1,
        borderColor:'#999999',
    },

    body: {
        flex: 1,
        marginBottom: 20,
        alignSelf: 'stretch',
        borderColor:'red',
        borderWidth: 2,
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

    itemPrice: {
        justifyContent: 'flex-end',
        width: '100%',
        height: 80,
        flex: 1,
        fontSize: 24,
        textAlign: 'right',
    },

    chart: {
        borderColor:'red',
        borderWidth: 1,
        width: '100%',
        height: '50%',
    },
}

export default css;