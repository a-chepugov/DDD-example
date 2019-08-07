import StringId from "../../../Domain/Models/StringId";
import Model from "../../../Domain/Models/_";
import _Repository from "../../../Domain/Repositories/_";

type TItem = { id: string, name: string };
type TDatabase = Array<TItem>;

export default class Repository implements _Repository {
    private readonly database: TDatabase;

    constructor(database: TDatabase) {
        this.database = database;
    }

    browse(stringIds: StringId[]): Iterable<Model> {
        return this.database
            .filter(({id}: { id: string }) => {
                const stringId = new StringId(id);
                return stringIds.find((stringIdCurrent: StringId) => stringIdCurrent.equals(stringId));
            })
            .map(({id, name}: TItem) => Model.create(id, name));
    }

    read(id: StringId): Model | undefined {
        const item: TItem | void = this.database.find(({id: idCurrent}: TItem) => id.equals(new StringId(idCurrent)));

        return item ?
            Model.create(item.id, item.name) :
            undefined;
    }
}
