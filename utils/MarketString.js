module.exports = {
    getQuoteCurrency: market => {
        return market.replace(/(.*\-)/g, "");
    }
}