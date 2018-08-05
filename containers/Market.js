import getMarket from './../actions/getMarket';
import { connect } from 'react-redux';
import Market from '../components/Market'

const mapStateToProps = state => {
    return { ...state, id: 'market' };
}
const mapDispatchToProps = dispatch => {
    return {
        getMarket: data => getMarket({ ...data }, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Market);