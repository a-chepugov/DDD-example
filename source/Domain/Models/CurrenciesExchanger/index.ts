import {
    Id as IId,
    Entity,
    Event,
    EventBus
} from "DDD-Core";

import NumberId from "../NumberId";
import Currency from "../Currency";
import CurrenciesExchangeRate from "../CurrenciesExchangeRate";
import Money from "../Money";

export enum ERRORS {
    LOADER_FAILED = 'Exchange rates loading failed',
    RATE_MISSED = 'Required rate missing'
}

export class CurrenciesRateId implements IId<CurrenciesExchangeRate> {
    private readonly rate: CurrenciesExchangeRate;

    constructor(rate: CurrenciesExchangeRate) {
        this.rate = rate || CurrenciesExchangeRate.default();
    }

    toString(): string {
        return CurrenciesRateId.idFromParams(this.rate.from, this.rate.to);
    }

    equals(other: CurrenciesRateId): boolean {
        return this.toString() === other.toString();
    };

    static idFromParams(from: Currency, to: Currency) {
        return `${from.code}_${to.code}`;
    }
}

export interface ILoader {
    (id: NumberId, from: Currency, to: Currency): CurrenciesExchangeRate | void
}

class addCurrenciesRateEvent implements Event {
    readonly payload: { id: NumberId, rate: CurrenciesExchangeRate };
    readonly timestamp: number;

    constructor(id: NumberId, rate: CurrenciesExchangeRate) {
        this.payload = {id, rate};
        this.timestamp = Date.now();
    }
}

export default class CurrenciesExchanger implements Entity<NumberId> {
    public readonly _id: NumberId;
    private rates: Map<string, CurrenciesExchangeRate>;
    private exchangeRatesLoader: ILoader | Function;
    // private readonly bus: EventBus<any> | undefined;

    // constructor(id: NumberId, exchangeRatesLoader: ILoader | void, bus: EventBus<any> | undefined) {
    constructor(id: NumberId, exchangeRatesLoader: ILoader | void) {
        this.rates = new Map();
        this._id = id;
        this.exchangeRatesLoader = typeof exchangeRatesLoader === 'function' ? exchangeRatesLoader : new Function();
        // this.bus = bus;
    }

    id(): NumberId {
        return this._id;
    }

    addCurrenciesRate(rate: CurrenciesExchangeRate): CurrenciesExchanger {
        this.rates.set((new CurrenciesRateId(rate)).toString(), rate);
        // this.bus ? this.bus.publish(addCurrenciesRateEvent, new addCurrenciesRateEvent(this._id), rate) : undefined;
        return this;
    }

    equals(other: CurrenciesExchanger): boolean {
        return false;
    };

    getRate(from: string, to: string): Promise<number> {
        const fromCurrency = new Currency(from);
        const toCurrency = new Currency(to);

        const id = CurrenciesRateId.idFromParams(fromCurrency, toCurrency);
        if (this.rates.has(id)) {
            const rate = this.rates.get(id)!;
            return Promise.resolve(rate.rate);
        } else {
            return this.loadExchangeRates(this.id(), fromCurrency, toCurrency)
                .then((rate: CurrenciesExchangeRate | void) => {
                    return rate ?
                        rate.rate :
                        Promise.reject(new Error(ERRORS.RATE_MISSED));
                });
        }
    }

    private loadExchangeRates(id: NumberId, from: Currency, to: Currency): Promise<CurrenciesExchangeRate | void> {
        return Promise.resolve()
            .then(() => this.exchangeRatesLoader(this.id(), from, to))
            .then((rate: CurrenciesExchangeRate) => {
                if (rate) {
                    this.addCurrenciesRate(rate);
                }
                return rate;
            })
            .catch(() => {
                throw new Error(ERRORS.LOADER_FAILED);
            })
    }

    exchange(money: Money, to: Currency): Promise<Money> {
        const id = CurrenciesRateId.idFromParams(money.currency, to);
        if (this.rates.has(id)) {
            const rate = this.rates.get(id)!;
            return Promise.resolve(rate.convert(money));
        } else {
            return this.loadExchangeRates(this.id(), money.currency, to)
                .then((rate: CurrenciesExchangeRate | void) => {
                    return rate ?
                        rate.convert(money) :
                        Promise.reject(new Error(ERRORS.RATE_MISSED));
                });
        }
    }
}
