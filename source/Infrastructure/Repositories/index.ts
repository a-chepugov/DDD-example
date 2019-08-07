import Currency from "./Currency";
import CurrenciesExchanger from "./CurrenciesExchanger";
import ICurrencyRepository from "../../Domain/Repositories/Currency";
import ICurrenciesExchanger from "../../Domain/Repositories/CurrenciesExchanger";

export interface IRepositories {
    currency: ICurrencyRepository
    currenciesExchanger: ICurrenciesExchanger
}

const CurrenciesDB = [{code: 'USD'}, {code: 'EUR'}, {code: 'JPY'}];
const currenciesExchangerDB = [{id: 1}];
const currenciesExchangerRatesDB = [
    {id: 1, from: 'USD', to: 'EUR', timestamp: 1500000000000, rate: 1.5},
    {id: 1, from: 'USD', to: 'JPY', timestamp: 1500000000000, rate: 1.2},
];

export default (): IRepositories => {
    const currency = new Currency(CurrenciesDB);
    const currenciesExchanger = new CurrenciesExchanger(currenciesExchangerDB, currenciesExchangerRatesDB);

    return {
        currency,
        currenciesExchanger
    }
}
