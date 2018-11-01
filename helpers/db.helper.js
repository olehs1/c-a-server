const fs = require('file-system');
const dbSource = 'db.txt';
const encoding = 'utf8';

class Database {
    constructor() {

    }

    saveCurrencyRates(currencyRates){
        fs.readFile(dbSource, encoding,(err, data) => {
            console.log(data);
            const result = data + currencyRates + ';';
            fs.writeFile(dbSource, result, encoding, (err) => {
                if (err) throw err;
                console.log('saved success');
            });
        });
    }

    getCurrencyRates(){
        return new Promise((resolve, reject) => {
            fs.readFile(dbSource, encoding,(err, data) => {
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = new Database();
