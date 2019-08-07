import {Service} from "DDD-Core";
import Currency from "../../../Domain/Models/Currency";
import StringId from "../../../Domain/Models/StringId";
import ICurrencyRepository from "../../../Domain/Repositories/Currency";


export default class CurrencyService implements Service {
    private readonly currencyRepository: ICurrencyRepository;

    constructor(currencyRepository: ICurrencyRepository) {
        this.currencyRepository = currencyRepository;
    }

    get(id: string): Currency | void {
        return this.currencyRepository.read(new StringId(id));
    }


}
