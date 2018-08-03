import getMarkets from './../actions/getMarkets';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard'

const mapStateToProps = state => {
    return { markets: state.markets, id: 'home' };
}
const mapDispatchToProps = dispatch => {
    return {
        getMarkets: () => getMarkets({}, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);