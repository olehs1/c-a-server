const moment = require('moment');

const {
    getLastCurrencyRates
} = require('./helpers/currency-rates.helper');

const rootHandler = (req, res) => {
    res.send('Hello Node!');
};

const currencyRatesHandler = (req, res) => {
    const onSuccess = (lastCurrencyRates) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(lastCurrencyRates);
    };
    getLastCurrencyRates().then(onSuccess);
};

const lastDateHandler = (req, res) => {
    const onSuccess = (lastCurrencyRates) => {
        const result = moment(JSON.parse(lastCurrencyRates).time).format('MMMM Do YYYY, h:mm:ss a');
        res.setHeader('Content-Type', 'text/json');
        res.send(result);
    };
    getLastCurrencyRates().then(onSuccess);
};

module.exports = {
    rootHandler,
    currencyRatesHandler,
    lastDateHandler
};