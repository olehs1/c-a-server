const {
    indexHandler,
    currencyRatesHandler
} = require('./routeHandlers');
const { routes } = require('./config');
const express = require('express');
const app = express();

app.get(routes.index, indexHandler);
app.get(routes.currencyRates, currencyRatesHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});