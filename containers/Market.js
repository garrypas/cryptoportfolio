import getMarket from './../actions/getMarketWithBaseMarkets';
import getMarketTick from './../actions/getMarketTick';
import changeInterval from './../actions/changeInterval';
import { connect } from 'react-redux';
import Market from '../components/Market'

const mapStateToProps = state => {
    let result = { ...state, id: 'market' };
    return result;
}
const mapDispatchToProps = dispatch => {
    return {
        getMarket: data => getMarket({ ...data }, dispatch),
        getMarketTick: data => getMarketTick({ ...data }, dispatch),
        changeInterval: data => changeInterval({ ...data }, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Market);