const {
    getCurrencyRates
} = require('./currency-rates.helper');
const db = require('./db.helper');

const INTERVAL = 1000;

class Watcher {
    constructor(){
        this.currencyRatesInterval = null;
    }

    start(){
        this.currencyRatesInterval = setInterval(this.getCurrencyRates.bind(this), INTERVAL);
    }

    getCurrencyRates() {
        clearInterval(this.currencyRatesInterval);
        const onSuccess = (currencyRates) => {
            console.log(currencyRates);
            console.log('getCurrencyRates');
            //this.start();
            db.saveCurrencyRates(currencyRates);
        };
        getCurrencyRates().then(onSuccess);
    }
}

module.exports = new Watcher();