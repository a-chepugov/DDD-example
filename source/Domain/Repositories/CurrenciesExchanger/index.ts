import {Repository} from "DDD-Core";
import CurrenciesExchanger from "../../Models/CurrenciesExchanger";
import NumberId from "../../Models/NumberId";

export default interface CurrenciesExchangerRepository extends Repository<CurrenciesExchanger> {
    read(id: NumberId): CurrenciesExchanger | undefined

    add(instance: CurrenciesExchanger): void;
}
