const request = require("request");
const cheerio = require("cheerio");
const _ = require("lodash");
const currencyRatesUrl = 'https://minfin.com.ua/currency';
const { errorHandler } = require('./error.helper');
const db = require('./db.helper');

const getCurrencyRatesRequestOptions = () => {
    return {
        url: currencyRatesUrl,
        headers: {
            'User-Agent': 'request'
        }
    }
};

const getCurrencyRatesRequest = () => {
    return new Promise((resolve, reject) => {
        request(getCurrencyRatesRequestOptions(), function (error, response, body) {
            if (!error) {
                resolve(JSON.stringify(getParsedCurrencyRatesResponse(body)));
            } else {
                reject(JSON.stringify(errorHandler(error)));
            }
        });
    });
};

const getParsedCurrencyRatesResponse = (body) => {
    const $ = cheerio.load(body);
    const currencyValueElements = $($('.mfm-table .mfm-text-nowrap')[4]).text().split('/');
    const usdBuy = getRateByIndex(currencyValueElements, 0);
    const usdSell = getRateByIndex(currencyValueElements, 1);
    const time = Date.now();

    return {
        usdBuy,
        usdSell,
        time
    };
};

const getRateByIndex = (body, index) => {
    return _.toNumber(
        _.trim(_.nth(body, index)).replace(',', '.')
    );
};

const getLastCurrencyRates = () => {
    return new Promise((resolve, reject) => {
        db.getCurrencyRates().then((currencyRates) => {

            // console.log('currencyRates===>', currencyRates);
            const arr = _.split(currencyRates, ';');
            console.log(arr);
            // const result = _(currencyRates)
            //     .split(';')
            //     .map((obj) => JSON.parse(obj))
            //     .last();

            // console.log(':+', result);
            resolve({});
        });
    });
};

module.exports = {
    getCurrencyRatesRequest,
    getLastCurrencyRates
};