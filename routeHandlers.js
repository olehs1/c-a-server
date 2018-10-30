const request = require("request");

const {
    getCurrencyRatesRequestOptions,
    getParsedCurrencyRatesResponse
} = require('./helpers/currency-rates.helper');
const { errorHandler } = require('./helpers/error.helper');

const rootHandler = (req, res) => {
    res.send('Hello Node!');
};

const currencyRatesHandler = (req, res) => {
    request(getCurrencyRatesRequestOptions(), function (error, response, body) {
        if (!error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(getParsedCurrencyRatesResponse(body)));
        } else {
            res.send(JSON.stringify(errorHandler(error)));
        }
    });
};

module.exports = {
    rootHandler,
    currencyRatesHandler
};