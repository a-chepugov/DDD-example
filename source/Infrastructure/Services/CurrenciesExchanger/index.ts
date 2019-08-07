import {Service} from "DDD-Core";
import NumberId from "../../../Domain/Models/NumberId";
import ICurrenciesExchanger from "../../../Domain/Repositories/CurrenciesExchanger";

export default class CurrenciesExchangerService implements Service {
    private readonly currenciesExchanger: ICurrenciesExchanger;

    constructor(currenciesExchanger: ICurrenciesExchanger) {
        this.currenciesExchanger = currenciesExchanger;
    }

    add(id: number, from: string, to: string, timestamp: number, rarate: number): Promise<boolean> {
        // @todo Сохранение
        return Promise.resolve(true);
    }

    read(id: number, from: string, to: string, timestamp: number): Promise<number | undefined> {
        const currenciesExchanger = this.currenciesExchanger.read(new NumberId(id));
        return currenciesExchanger ?
            currenciesExchanger.getRate(from, to, timestamp) :
            Promise.reject(new Error('Invalid currencies exchanger'));
    }

}
