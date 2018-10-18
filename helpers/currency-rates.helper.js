const cheerio = require("cheerio");
const _ = require("lodash");
const currencyRatesUrl = 'https://minfin.com.ua/currency';

const getCurrencyRatesRequestOptions = () => {
    return {
        url: currencyRatesUrl,
        headers: {
            'User-Agent': 'request'
        }
    }
};

const getParsedCurrencyRatesResponse = (body) => {
    const $ = cheerio.load(body);
    const currencyValueElements = $($('.mfm-table .mfm-text-nowrap')[4]).text().split('/');
    const usdBuy = getRateByIndex(currencyValueElements, 0);
    const usdSell = getRateByIndex(currencyValueElements, 1);

    return {
        usdBuy,
        usdSell
    };
};

const getRateByIndex = (body, index) => {
    return _.toNumber(
        _.trim(_.nth(body, index)).replace(',', '.')
    );
};

module.exports = {
    getCurrencyRatesRequestOptions,
    getParsedCurrencyRatesResponse
};