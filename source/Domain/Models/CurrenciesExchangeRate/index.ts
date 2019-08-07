import {ValueObject} from "DDD-Core";

import Currency from "../Currency";
import Money from "../Money";

export default class CurrenciesExchangeRate implements ValueObject<CurrenciesExchangeRate> {
    public readonly timestamp: number;
    public readonly from: Currency;
    public readonly to: Currency;
    private _rate!: number;

    constructor(from: Currency, to: Currency, timestamp: number, rate: number) {
        this.timestamp = timestamp;
        this.from = from;
        this.to = to;
        this.setRate(rate);
    }

    get rate() {
        return this._rate;
    }

    private setRate(value: number): void | never {
        if (value > 0) {
            this._rate = value
        } else {
            throw new Error('Rate is not valid');
        }
    }

    equals(other: CurrenciesExchangeRate): boolean {
        return Boolean(
            this.from.equals(other.from) &&
            this.to.equals(other.to) &&
            this.timestamp === other.timestamp &&
            this.rate === other.rate
        );
    };

    estimate(amount: number): number {
        return this.rate * amount;
    }

    convert(money: Money): Money {
        if (money.currency.equals(this.from)) {
            return new Money(this.estimate(money.amount), this.to);
        } else {
            throw new Error('Invalid input money');
        }
    }

    static create(from: string, to: string, timestamp: number, rate: number): CurrenciesExchangeRate {
        return new CurrenciesExchangeRate(new Currency(from), new Currency(to), timestamp, rate);
    }

    static default(): CurrenciesExchangeRate {
        return new CurrenciesExchangeRate(Currency.default(), Currency.default(), Date.now(), 1);
    }
}
