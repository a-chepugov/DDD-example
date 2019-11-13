import {expect} from "chai";

import Testee from "./index";
import Currency from "../Currency";
import Money from "../Money";

describe("Models", () => {

    describe("CurrenciesExchangeRate", () => {

        it("default", () => {
            const testee = Testee.default();
            expect(Currency.default().equals(testee.from)).to.be.deep.equal(true);
        });

        it("USD/EUR rate equals USD/EUR rate", () => {
            const testee1 = new Testee(new Currency('USD'), new Currency('EUR'), 1.5);
            const testee2 = new Testee(new Currency('USD'), new Currency('EUR'), 1.5);

            expect(testee1.equals(testee2)).to.be.equal(true);
        });

        it("USD/EUR rate no equals USD/JPY rate", () => {
            const timestamp = Date.now();
            const testee1 = new Testee(new Currency('USD'), new Currency('EUR'), 1.5);
            const testee2 = new Testee(new Currency('USD'), new Currency('JPY'), 1.5);

            expect(testee1.equals(testee2)).to.be.equal(false);
        });

        it("USD/EUR rate no equals another USD/EUR rate", () => {
            const timestamp = Date.now();
            const testee1 = new Testee(new Currency('USD'), new Currency('EUR'), 1.5);
            const testee2 = new Testee(new Currency('USD'), new Currency('EUR'), 1.2);

            expect(testee1.equals(testee2)).to.be.equal(false);
        });

        it("estimate 10 EUR", () => {
            const timestamp = Date.now();
            const EUR = new Currency('EUR');
            const USD = new Currency('USD');
            const testee1 = new Testee(EUR, USD, 1.5);
            expect(testee1.estimate(10)).to.be.equal(15);
        });

        it("convert 10 EUR to 15 USD", () => {
            const timestamp = Date.now();
            const EUR = new Currency('EUR');
            const USD = new Currency('USD');
            const testee1 = new Testee(EUR, USD, 1.5);
            const a10EUR = new Money(10, EUR);
            const a15USD = new Money(15, USD);

            expect(testee1.convert(a10EUR).equals(a15USD)).to.be.equal(true);
        });

    });

});
