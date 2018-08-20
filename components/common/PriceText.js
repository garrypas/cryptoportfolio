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
        const units = this.props.units === 'BTC' ? 'Sats' : this.props.units;
        const priceStyle = [styles.itemPriceText];
        let direction = '';
        if (previousPrice > currentPrice) {
            direction = 'down';
        }
        if (currentPrice > previousPrice) {
            direction = 'up';
        }
        const text = this.getFormatPrice();
        return (
            <Text style={[this.props.style, (direction === 'up' ? styles.itemPriceTextUp : direction === 'down' ? styles.itemPriceTextDown : '')]} >{ text }</Text>
        );
    }

    getSymbol() {
        switch(this.props.units) {
            case 'USDT':
                return '$';
            case 'BTC':
                return '฿';
            case 'ETH':
                return 'Ξ';
            default:
                return null;
        }
    }

    getFormatPrice() {
        const dp = this.props.units === 'USDT' ? 2 : 8;
        const symbol =  this.getSymbol();
        return `${symbol || ""}${ this.props.price ? this.props.price.toFixed(dp) : '---' }${ this.props.units && !symbol ? ' ' + this.props.units : '' }`;
    }
}

export { PriceText };