import getMarkets from './../actions/getMarkets';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard'

const mapStateToProps = state => {
    return { markets: state.markets };
}
const mapDispatchToProps = dispatch => {
    console.log('dispatching...');
    return {
        getMarkets: () => dispatch(getMarkets())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);