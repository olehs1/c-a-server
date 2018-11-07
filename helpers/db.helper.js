const fs = require('file-system');
const dbSource = 'db.txt';
const encoding = 'utf8';

class Database {
    constructor() {

    }

    static saveCurrencyRates(currencyRates){
        fs.readFile(dbSource, encoding,(err, data) => {
            const result = data + currencyRates + ';';
            fs.writeFile(dbSource, result, encoding, (err) => {
                if (err) throw err;
            });
        });
    }

    static getCurrencyRates(){
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

    static getSize() {
        const stats = fs.statSync(dbSource);
        const fileSizeInBytes = stats.size;

        return fileSizeInBytes / 1000000.0;
    }
}

module.exports = Database;
