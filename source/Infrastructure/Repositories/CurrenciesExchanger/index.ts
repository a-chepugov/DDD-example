import NumberId from "../../../Domain/Models/NumberId";
import Currency from "../../../Domain/Models/Currency";
import CurrenciesExchanger from "../../../Domain/Models/CurrenciesExchanger";
import {ILoader} from "../../../Domain/Models/CurrenciesExchanger";
import CurrenciesExchangeRate from "../../../Domain/Models/CurrenciesExchangeRate";

import ICurrenciesExchangerRepository from "../../../Domain/Repositories/CurrenciesExchanger";

type TItem = { id: number };
type TDatabase = Array<TItem>;

type TItemRate = { id: number, from: string, to: string, timestamp: number, rate: number };
type TDatabaseRates = Array<TItemRate>;

export default class CurrenciesExchangerRepository implements ICurrenciesExchangerRepository {
    private readonly database: TDatabase;
    private readonly databaseRates: TDatabaseRates;
    private readonly loader: ILoader;

    constructor(database: TDatabase, databaseRates: TDatabaseRates) {
        this.database = database;
        this.databaseRates = databaseRates;

        this.loader = (id: NumberId, from: Currency, to: Currency, timestamp: number): CurrenciesExchangeRate | void => {
            const item = databaseRates.find(({id: idCurrent, from: fromCurrent, to: toCurrent, timestamp: timestampCurrent}: TItemRate) => {
                return (
                    id.value === idCurrent &&
                    from.code === fromCurrent &&
                    to.code === toCurrent &&
                    timestamp === timestampCurrent
                )
            });

            return item ? new CurrenciesExchangeRate(from, to, timestamp, item.rate): undefined;
        }
    }

    read(id: NumberId): CurrenciesExchanger | undefined {
        const item: TItem | void = this.database.find(({id: idCurrent}: TItem) => id.equals(new NumberId(idCurrent)));

        return item ?
            new CurrenciesExchanger(new NumberId(item.id), this.loader) :
            undefined;
    }

    add(instance: CurrenciesExchanger): void {
        this.database.push({id: instance.id().value})
    }
}
