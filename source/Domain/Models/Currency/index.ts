import {ValueObject, Entity} from "DDD-Core";
import StringId from "../StringId";

export default class Currency implements Entity<StringId> {
    public readonly code: string;

    constructor(code: string) {
        this.code = code;
    }

    id(): StringId {
        return new StringId(this.code);
    }

    equals(other: Currency): boolean {
        return this.code === other.code;
    }

    static default() {
        return new Currency('USD');
    }
}
