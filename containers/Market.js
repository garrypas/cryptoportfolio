import getMarket from './../actions/getMarket';
import getMarketTick from './../actions/getMarketTick';
import { connect } from 'react-redux';
import Market from '../components/Market'
import Intervals from '../utils/Intervals';

const mapStateToProps = state => {
    return { ...state, id: 'market' };
}
const mapDispatchToProps = dispatch => {
    return {
        getMarket: data => getMarket({ ...data }, dispatch),
        getMarketTick: data => getMarketTick({ ...data }, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Market);