const cheerio = require("cheerio");
const _ = require("lodash");
const currencyRatesUrl = 'https://minfin.com.ua/currency/usd';

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
    const currencyValueElements = $(".mfm-table .mfm-posr");
    const usdBuy = getRateByElementIndex(currencyValueElements, 2);
    const usdSell = getRateByElementIndex(currencyValueElements, 3);

    return {
        usdBuy,
        usdSell
    };
};

const getRateByElementIndex = (body, index) => {
    return _.toNumber(
        _.first(cheerio(body[index]).text().split(' '))
    );
};

module.exports = {
    getCurrencyRatesRequestOptions,
    getParsedCurrencyRatesResponse
};