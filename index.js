const {
    rootHandler,
    currencyRatesHandler,
    lastDateHandler,
    dbSizeHandler
} = require('./routeHandlers');
const { routes } = require('./config');
const watcher = require('./helpers/watcher.helper');
const express = require('express');
const cors = require('cors');
const app = express();

cors({credentials: true, origin: true});

app.use(cors());

app.get(routes.root, rootHandler);
app.get(routes.currencyRates, currencyRatesHandler);
app.get(routes.lastDate, lastDateHandler);
app.get(routes.dbSize, dbSizeHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    watcher.start();
    console.log(`Server listening on port ${PORT}!`);
});