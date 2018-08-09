module.exports = {
    getQuoteCurrency: market => {
        return market.replace(/(.*\-)/g, "");
    },
    getBaseCurrency: market => {
        let baseCurrency = market.replace(/(\-.*)/g, "");
        if(baseCurrency === "BTC") {
            baseCurrency = 'Sats';
        }
        return baseCurrency;
    },
}