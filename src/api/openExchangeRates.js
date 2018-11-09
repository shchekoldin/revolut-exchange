import {ajax} from 'rxjs/ajax';
import {catchError, map} from 'rxjs/operators';

function convertRates(baseCurrency, quotedCurrency, baseRates) {
    logger.debug('Converting rates:', baseCurrency, '→', quotedCurrency);

    const quotedRate = 1 / baseRates[quotedCurrency];

    return Object.entries(baseRates).reduce((acc, [currency, rate]) => {
        if (quotedCurrency === currency) {
            acc[currency] = 1;
        } else {
            acc[currency] = rate * quotedRate;
        }

        return acc;
    }, {});
}

function getLatest(baseCurrency) {
    logger.debug('Loading latest rates:', baseCurrency);

    const appId = process.env.OPEN_EXCHANGE_RATES_APP_ID;
    const url = `//openexchangerates.org/api/latest.json?app_id=${appId}`;
    const urlWithCurrency = `${url}&base=${baseCurrency}`;

    return ajax(urlWithCurrency).pipe(
        // TODO: Better to cache this response
        catchError(() => ajax(url).pipe(
            map((response) => {
                const data = response.response;

                logger.debug('Falling back to "manual" rates conversion');

                if (data.base === baseCurrency) {
                    logger.debug('Base currency is the same as expected, nothing to do');

                    return response;
                }

                return {
                    response: {
                        ...data,
                        base: baseCurrency,
                        rates: convertRates(data.base, baseCurrency, data.rates),
                    },
                };
            }),
        )),
    );
}

export default {
    getLatest,
};
