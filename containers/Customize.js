"use strict";

import { connect } from 'react-redux';
import Customize from '../components/Customize'
import getMyCurrencies from './../actions/getMyCurrencies';
import filterMarkets from './../actions/filterMarkets';
import addToMyCurrencies from './../actions/addToMyCurrencies';
import removeMyCurrency from './../actions/removeMyCurrency';

const mapStateToProps = state => {
    let result = { ...state, id: 'customize' };
    return result;
}
const mapDispatchToProps = dispatch => {
    return {
        getMyCurrencies: data => getMyCurrencies(data, dispatch),
        filterMarkets: data => filterMarkets(data, dispatch),
        addToMyCurrencies: data => addToMyCurrencies(data, dispatch),
        removeMyCurrency: data => removeMyCurrency(data, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Customize);