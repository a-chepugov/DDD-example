import StringId from "../../../Domain/Models/StringId";
import Currency from "../../../Domain/Models/Currency";
import ICurrencyRepository from "../../../Domain/Repositories/Currency";

type TItem = { code: string };
type TDatabase = Array<TItem>;

export default class CurrencyRepository implements ICurrencyRepository {
    private readonly database: TDatabase;

    constructor(database: TDatabase) {
        this.database = database;
    }

    browse(stringIds: StringId[]): Iterable<Currency> {
        return this.database
            .filter(({code}: TItem) => {
                const stringId = new StringId(code);
                return stringIds.find((stringIdCurrent: StringId) => stringIdCurrent.equals(stringId));
            })
            .map(({code}: TItem) => new Currency(code));
    }

    read(id: StringId): Currency | undefined {
        const item: TItem | void = this.database.find(({code: codeCurrent}: TItem) => id.equals(new StringId(codeCurrent)));

        return item ?
            new Currency(item.code) :
            undefined;
    }
}
