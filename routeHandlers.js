const moment = require('moment');
// const indexView = require('./views/index.html');

const {
    getLastCurrencyRates
} = require('./helpers/currency-rates.helper');

const rootHandler = (req, res) => {
    res.send('Hello Node!');
    // res.render(indexView, { name: 'World' });
};
const db = require('./helpers/db.helper');

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

const dbSizeHandler = (req, res) => {
    const size = db.getSize();
    res.send(`${size} MB`);
};

module.exports = {
    rootHandler,
    currencyRatesHandler,
    lastDateHandler,
    dbSizeHandler
};