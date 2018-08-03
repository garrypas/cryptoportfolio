import getMarkets from './../actions/getMarkets';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard'

const mapStateToProps = state => {
    return { ...state, id: 'home' };
}
const mapDispatchToProps = dispatch => {
    return {
        getMarkets: data => getMarkets(data, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);