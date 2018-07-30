const debug = require('debug')('app');

export default (state = [], action) => {
    console.log(action);
    switch(action.type) {
        case 'GET_MARKETS':
            let markets = [{
                "MarketCurrency" : "LTC",
                "BaseCurrency" : "BTC",
                "MarketCurrencyLong" : "Litecoin",
                "BaseCurrencyLong" : "Bitcoin",
                "MinTradeSize" : 0.01000000,
                "MarketName" : "BTC-LTC",
                "IsActive" : true,
                "Created" : "2014-02-13T00:00:00"
	    	}, {
                "MarketCurrency" : "DOGE",
                "BaseCurrency" : "BTC",
                "MarketCurrencyLong" : "Dogecoin",
                "BaseCurrencyLong" : "Bitcoin",
                "MinTradeSize" : 100.00000000,
                "MarketName" : "BTC-DOGE",
                "IsActive" : true,
                "Created" : "2014-02-13T00:00:00"
            }];
            markets.forEach(m => m.key = m.MarketName);
            return { markets };
        default:
            console.log('default called!');
            console.log(state);
            return state;
    }
}