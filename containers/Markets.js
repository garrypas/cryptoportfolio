import getFilteredMarkets from './../actions/getFilteredMarkets';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';


const mapStateToProps = state => {
    return { ...state, id: 'home' };
}
const mapDispatchToProps = dispatch => {
    return {
        getMarkets: data => getFilteredMarkets(data, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);