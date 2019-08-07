import {Id} from "DDD-Core";

export default class NumberId implements Id<number> {
    public readonly value: number;

    constructor(value: number) {
        this.value = value;
    }

    equals(other: NumberId): boolean {
        return Boolean(this.value && other.value && this.value === other.value);
    };

    static default(): NumberId {
        return new NumberId(0);
    }
}
