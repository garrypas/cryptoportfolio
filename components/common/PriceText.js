import { Text } from 'react-native';
import React from 'react';
import styles from './PriceText.css';

class PriceText extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const currentPrice = this.props.price;
        const previousPrice = this.props.previousPrice;
        console.log(this.props);
        const units = this.props.units === 'BTC' ? 'Sats' : this.props.units;
        const priceStyle = [styles.itemPriceText];
        let direction = '';
        if (previousPrice > currentPrice) {
            direction = 'down';
        }
        if (currentPrice > previousPrice) {
            direction = 'up';
        }
        const text = `${ currentPrice ? currentPrice.toFixed(8) : '---' }${ units ? ' ' + units : '' }`
        return (
            <Text style={[this.props.style, (direction === 'up' ? styles.itemPriceTextUp : direction === 'down' ? styles.itemPriceTextDown : '')]} >{ text }</Text>
        );
    }
}

export { PriceText };