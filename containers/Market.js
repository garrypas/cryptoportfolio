import getMarket from './../actions/getMarket';
import { connect } from 'react-redux';
import Market from '../components/Market'

const mapStateToProps = state => {
    state.id = 'market';
    return state;
}
const mapDispatchToProps = dispatch => {
    return {
        getMarket: market => getMarket({ market }, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Market);