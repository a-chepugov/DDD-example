import {Service} from "DDD-Core";
import NumberId from "../../../Domain/Models/NumberId";
import CurrenciesExchanger from "../../../Domain/Models/CurrenciesExchanger";
import CurrenciesExchangeRate from "../../../Domain/Models/CurrenciesExchangeRate";
import ICurrenciesExchangerRepository from "../../../Domain/Repositories/CurrenciesExchanger";

export enum ERRORS {
    CURRENCIES_EXCHANGER_MISSED = 'Currencies exchanger missed'
}

export default class CurrenciesExchangerService implements Service {
    private readonly currenciesExchangerRepository: ICurrenciesExchangerRepository;

    constructor(currenciesExchangerRepository: ICurrenciesExchangerRepository) {
        this.currenciesExchangerRepository = currenciesExchangerRepository;
    }

    add(id: number, from: string, to: string, rate: number): Promise<boolean> {

        return this.currenciesExchangerRepository.read(new NumberId(id))
            .then((currenciesExchanger: CurrenciesExchanger | undefined): boolean => {
                if (!currenciesExchanger) {
                    currenciesExchanger = new CurrenciesExchanger(new NumberId(id));
                    this.currenciesExchangerRepository.add(currenciesExchanger);
                }
                if (currenciesExchanger) {
                    const currenciesExchangeRate = CurrenciesExchangeRate.create(from, to, rate);
                    currenciesExchanger.addCurrenciesRate(currenciesExchangeRate);
                } else {
                    throw new Error(ERRORS.CURRENCIES_EXCHANGER_MISSED);
                }
                return true;
            });
    }

    read(id: number, from: string, to: string): Promise<number | undefined> {
        return this.currenciesExchangerRepository.read(new NumberId(id))
            .then((currenciesExchanger: CurrenciesExchanger | undefined): Promise<number | undefined> => {
                return currenciesExchanger ?
                    currenciesExchanger.getRate(from, to) :
                    Promise.reject(new Error(ERRORS.CURRENCIES_EXCHANGER_MISSED));
            })
    }

}
