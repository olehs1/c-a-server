const {
    getLastCurrencyRates
} = require('./helpers/currency-rates.helper');

const rootHandler = (req, res) => {
    res.send('Hello Node!');
};

const currencyRatesHandler = (req, res) => {
    const onSuccess = (lastCurrencyRates) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(lastCurrencyRates));

    };
    getLastCurrencyRates().then(onSuccess);
};

module.exports = {
    rootHandler,
    currencyRatesHandler
};