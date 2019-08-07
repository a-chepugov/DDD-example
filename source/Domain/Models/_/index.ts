import StringId from "../StringId";
import {Aggregate} from "DDD-Core";

export default class Model implements Aggregate<StringId> {
    readonly _id: StringId;
    private _name!: string;

    constructor(s: StringId, name: string = '') {
        this._id = s;
        this.name = name;
    }

    set name(value: string) {
        this._name = value;
    }

    get name(): string {
        return this._name;
    }

    id(): StringId {
        return this._id
    }

    equals(other: Model): boolean {
        return (
            this === other ||
            this.id().equals(other.id())
        );
    }

    static default(): Model {
        return new Model(StringId.default(), '');
    }

    static create(id: string, name: string): Model {
        const model = new Model(new StringId(id), id);
        model.name = name;
        return model;
    }
}
