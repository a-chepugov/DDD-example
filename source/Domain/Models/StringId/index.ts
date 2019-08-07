import {Id} from "DDD-Core";

export default class StringId implements Id<string> {
    public readonly value: string;

    constructor(value: string) {
        this.value = value;
    }

    equals(other: StringId): boolean {
        return Boolean(this.value && other.value && this.value === other.value);
    };

    static default(): StringId {
        return new StringId('');
    }
}
