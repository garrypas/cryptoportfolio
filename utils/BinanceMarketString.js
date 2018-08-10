module.exports = {
    getQuoteCurrency: market => {
        if(!market) {
            throw 'Market string could not be formatted. Might be empty or undefined.'
        }
        if(market.length <= 3) {
            return "";
        }
        return market.substring(0, market.length - 3);
    },

    getBaseCurrency: market => {
        if(!market) {
            throw 'Market string could not be formatted. Might be empty or undefined.'
        }
        if(market.length <= 3) {
            return "";
        }
        return market.substring(market.length - 3);
    },
}