import getMarketWithBaseMarkets from './../actions/getMarketWithBaseMarkets';
import getMarketTickWithBaseMarkets from './../actions/getMarketTickWithBaseMarkets';
import changeInterval from './../actions/changeInterval';
import { connect } from 'react-redux';
import Market from '../components/Market'

const mapStateToProps = state => {
    let result = { ...state, id: 'market' };
    return result;
}
const mapDispatchToProps = dispatch => {
    return {
        getMarket: data => getMarketWithBaseMarkets({ ...data }, dispatch),
        getMarketTick: data => getMarketTickWithBaseMarkets({ ...data }, dispatch),
        changeInterval: data => changeInterval({ ...data }, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Market);