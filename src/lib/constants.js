export class LatestRates {
    static FETCH = 'LatestRates.FETCH';
    static FETCH_LOADED = 'LatestRates.FETCH_LOADED';
    static POLL = 'LatestRates.POLL';
}

export class CurrencyExchange {
    static EXCHANGE = 'CurrencyExchange.EXCHANGE';
    static UPDATE_BASE_AMOUNT = 'CurrencyExchange.UPDATE_BASE_AMOUNT';
    static ADD_USER_RATE = 'CurrencyExchange.ADD_USER_RATE';
    static CHANGE_BASE_CURRENCY = 'CurrencyExchange.CHANGE_BASE_CURRENCY';
    static CHANGE_QUOTE_CURRENCY = 'CurrencyExchange.CHANGE_QUOTE_CURRENCY';
}

export class UserAccount {
    static UPDATE_BALANCE = 'UserAccount.UPDATE_BALANCE';
}

export class Notifier {
    static SHOW_NOTIFICATION = 'Notifier.SHOW_NOTIFICATION';
    static REMOVE_OLD_NOTIFICATION = 'Notifier.REMOVE_OLD_NOTIFICATION';
}

export class NotificationMode {
    static INFO = 'NotificationMode.INFO';
    static ERROR = 'NotificationMode.ERROR';
}
