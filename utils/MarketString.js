module.exports = {
    getQuoteCurrency: market => {
        return market.replace(/(.*\-)/g, "");
    },
    getBaseCurrency: market => {
        return market.replace(/(\-.*)/g, "");
    },
}