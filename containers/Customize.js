"use strict";

import { connect } from 'react-redux';
import Customize from '../components/Customize'
import getMyCurrencies from './../actions/getMyCurrencies';

const mapStateToProps = state => {
    let result = { ...state, id: 'customize' };
    return result;
}
const mapDispatchToProps = dispatch => {
    return {
        getMyCurrencies: data => getMyCurrencies(data, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Customize);