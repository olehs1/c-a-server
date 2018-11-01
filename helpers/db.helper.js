const fs = require('file-system');
const dbSource = 'db.txt';
const encoding = 'utf8';

class Database {
    constructor() {

    }

    saveCurrencyRates(currencyRates){
        fs.readFile(dbSource, encoding,(err, data) => {
            console.log(data);
            const result = data + currencyRates + '\r\n';
            fs.writeFile(dbSource, result, encoding, (err) => {
                if (err) throw err;
                console.log('saved success');
            });
            // res.writeHead(200, {'Content-Type': 'text/html'});
            // res.write(data);
            // res.end();
        });
    }
}

module.exports = new Database();
