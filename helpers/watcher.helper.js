const {
    getCurrencyRatesRequest
} = require('./currency-rates.helper');
const db = require('./db.helper');

const INTERVAL = 1000000;

class Watcher {
    constructor(){
        this.currencyRatesInterval = null;
    }

    start(){
        this.getCurrencyRates();
        this.currencyRatesInterval = setInterval(this.getCurrencyRates.bind(this), INTERVAL);
    }

    getCurrencyRates() {
        const onSuccess = (currencyRates) => {
            db.saveCurrencyRates(currencyRates);
        };
        getCurrencyRatesRequest().then(onSuccess);
    }
}

module.exports = new Watcher();