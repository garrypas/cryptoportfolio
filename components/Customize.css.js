"use strict";

import styles from './common/styles.css';

let css = {
    ...styles,
    searchForm: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#999999',
        backgroundColor:'white',
        zIndex: 9999,
    },

    searchInput: {
      height: 40,
      alignItems: 'stretch',
      width: '100%',
      zIndex: 9999
    },

    searchButton: {
      height: 40,
      width: '25%',  
    },
}

export default css;