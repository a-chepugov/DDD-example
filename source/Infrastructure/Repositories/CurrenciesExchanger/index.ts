import NumberId from "../../../Domain/Models/NumberId";
import Currency from "../../../Domain/Models/Currency";
import CurrenciesExchanger from "../../../Domain/Models/CurrenciesExchanger";
import {ILoader} from "../../../Domain/Models/CurrenciesExchanger";
import CurrenciesExchangeRate from "../../../Domain/Models/CurrenciesExchangeRate";

import ICurrenciesExchangerRepository from "../../../Domain/Repositories/CurrenciesExchanger";

type TItem = { id: number };
type TDatabase = Array<TItem>;

type TItemRate = { id: number, from: string, to: string, rate: number };
type TDatabaseRates = Array<TItemRate>;

export default class CurrenciesExchangerRepository implements ICurrenciesExchangerRepository {
    private readonly database: TDatabase;
    private readonly databaseRates: TDatabaseRates;
    private readonly loader: ILoader;

    constructor(database: TDatabase, databaseRates: TDatabaseRates) {
        this.database = database;
        this.databaseRates = databaseRates;

        this.loader = (id: NumberId, from: Currency, to: Currency): CurrenciesExchangeRate | void => {
            const item = databaseRates.find(({id: idCurrent, from: fromCurrent, to: toCurrent}: TItemRate) => {
                return (
                    id.value === idCurrent &&
                    from.code === fromCurrent &&
                    to.code === toCurrent
                )
            });

            return item ? new CurrenciesExchangeRate(from, to, item.rate) : undefined;
        }
    }

    read(id: NumberId): Promise<CurrenciesExchanger | undefined> {
        const item: TItem | void = this.database.find(({id: idCurrent}: TItem) => id.equals(new NumberId(idCurrent)));

        return Promise.resolve(
            item ?
                new CurrenciesExchanger(new NumberId(item.id), this.loader) :
                undefined
        );
    }

    add(instance: CurrenciesExchanger): void {
        this.database.push({id: instance.id().value});
    }

    addRates(id: NumberId, instance: CurrenciesExchanger): void {
        this.databaseRates.push({id: 1, from: '', to: "", rate: 1});
    }

}
