import {Repository} from "DDD-Core";
import Currency from "../../Models/Currency";
import StringId from "../../Models/StringId";

export default interface CurrencyRepository extends Repository<Currency> {
    browse(...args: any[]): Iterable<Currency>;

    read(id: StringId): Currency | undefined
}
