module.exports = {
    getQuoteCurrency: market => {
        if(!market) {
            throw 'Market string could not be formatted. Might be empty or undefined.'
        }
        if(market.length <= 3) {
            return "";
        }
        let baseLength = 3;
        if(market.match(/USDT$/)) {
            baseLength = 4;
        }
        return market.substring(0, market.length - baseLength);
    },

    getBaseCurrency: market => {
        if(!market) {
            throw 'Market string could not be formatted. Might be empty or undefined.'
        }
        if(market.length <= 3) {
            return "";
        }
        if(market.match(/USDT$/)) {
            return "USDT";
        }
        return market.substring(market.length - 3);
    },
}