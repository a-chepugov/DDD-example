import {ValueObject} from "DDD-Core";

import Currency from "../Currency";

export default class Model implements ValueObject<Model> {
    readonly amount: number;
    readonly currency: Currency;

    constructor(amount: number, currency: Currency) {
        this.amount = amount;
        this.currency = currency;
    }

    equals(other: Model): boolean {
        return (
            this.amount === other.amount &&
            this.currency.equals(other.currency)
        );
    }

    add(other: Model): Model | never {
        if (this.currency.equals(other.currency)) {
            return new Model(this.amount + other.amount, this.currency);
        } else {
            throw new Error('Currencies mismatch');
        }
    }

    static default() {
        return new Model(0, Currency.default());
    }
}
