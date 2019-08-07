import {expect} from "chai";

import Testee from "./index";
import NumberId from "../NumberId";
import Currency from "../Currency";
import Money from "../Money";
import CurrenciesExchangeRate from "../CurrenciesExchangeRate";

describe("Models", () => {

    describe("CurrenciesExchanger", () => {

        it("exchange 150 EUR to 300 USD", () => {
            const timestamp = Date.now();
            const USD = new Currency('USD');
            const EUR = new Currency('EUR');

            const rate = new CurrenciesExchangeRate(EUR, USD, timestamp, 2);

            const instance = new Testee(NumberId.default());
            instance.addCurrenciesRate(rate);

            const a150EUR = new Money(150, EUR);
            const a300USD = new Money(300, USD);

            return instance.exchange(a150EUR, USD, timestamp)
                .then((response) => {
                    expect(response.equals(a300USD)).to.be.equal(true);
                })
        });

        it("can't exchange EUR to USD with invalid date", () => {
            const timestamp = Date.now();
            const USD = new Currency('USD');
            const EUR = new Currency('EUR');

            const rate = new CurrenciesExchangeRate(EUR, USD, timestamp, 2);

            const instance = new Testee(NumberId.default());
            instance.addCurrenciesRate(rate);

            const a150EUR = new Money(150, EUR);
            const a300USD = new Money(300, USD);

            return instance.exchange(a150EUR, USD, timestamp + 1)
                .then((response) => {
                    throw new Error();
                })
                .catch((error) => {
                    expect(error).to.not.be.undefined;
                })
        });

        it("can't exchange EUR to JPY without EUR/JPY saved currencies exchange rate", () => {
            const timestamp = Date.now();
            const USD = new Currency('USD');
            const EUR = new Currency('EUR');
            const JPY = new Currency('JPY');

            const rate = new CurrenciesExchangeRate(EUR, USD, timestamp, 2);

            const instance = new Testee(NumberId.default());
            instance.addCurrenciesRate(rate);

            const a150EUR = new Money(150, EUR);

            return instance.exchange(a150EUR, JPY, timestamp)
                .then((response) => {
                    throw new Error();
                })
                .catch((error) => {
                    expect(error).to.not.be.undefined;
                })
        });

        it("exchange EUR to JPY without saved EUR/JPY currencies exchange rate and backup", () => {
            const timestamp = Date.now();
            const USD = new Currency('USD');
            const EUR = new Currency('EUR');
            const JPY = new Currency('JPY');

            const rate = new CurrenciesExchangeRate(EUR, USD, timestamp, 2);

            const loader = (id: NumberId, from: Currency, to: Currency, timestamp: number): CurrenciesExchangeRate | void => {
                return new CurrenciesExchangeRate(EUR, JPY, timestamp, 1);
            };

            const instance = new Testee(NumberId.default(), loader);
            instance.addCurrenciesRate(rate);

            const a150EUR = new Money(150, EUR);
            const a150JPY = new Money(150, JPY);

            return instance.exchange(a150EUR, JPY, timestamp)
                .then((response) => {
                    expect(response.equals(a150JPY)).to.be.equal(true);
                })
        });

        it("can't exchange EUR to JPY without saved EUR/JPY currencies exchange rate and falsy backup", () => {
            const timestamp = Date.now();
            const USD = new Currency('USD');
            const EUR = new Currency('EUR');
            const JPY = new Currency('JPY');

            const rate = new CurrenciesExchangeRate(EUR, USD, timestamp, 2);

            const loader = (id: NumberId, from: Currency, to: Currency, timestamp: number): CurrenciesExchangeRate | void => {
            };

            const instance = new Testee(NumberId.default(), loader);
            instance.addCurrenciesRate(rate);

            const a150EUR = new Money(150, EUR);

            return instance.exchange(a150EUR, JPY, timestamp)
                .then((response) => {
                    throw new Error();
                })
                .catch((error) => {
                    expect(error).to.not.be.undefined;
                })
        });

    });

});
