import {Service} from "DDD-Core";
import Currency from "./Currency";
import CurrenciesExchanger from "./CurrenciesExchanger";
import {IRepositories} from "../Repositories";

export interface IServices {
    currency: Currency
    currenciesExchanger: CurrenciesExchanger
}

export default (repositories: IRepositories) => {
    const currency = new Currency(repositories.currency);
    const currenciesExchanger = new CurrenciesExchanger(repositories.currenciesExchanger);

    return {
        currency,
        currenciesExchanger,
    }
}

