import {ajax} from 'rxjs/ajax';

const getLatest = (baseCurrency) => {
    logger.debug('Loading latest rates:', baseCurrency);

    const url = `//openexchangerates.org/api/latest.json?app_id=${process.env.APP_ID}&base=${baseCurrency}`;

    return ajax(url);
};

export default {
    getLatest,
};
