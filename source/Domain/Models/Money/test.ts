import {expect} from "chai";

import Money from "./index";
import Currency from "../Currency";

describe("Models", () => {

    describe("Money", () => {

        it("default value", () => {
            const money = Money.default();

            expect(money.amount).to.be.equal(0);
            expect(money.currency.code).to.be.equal('USD');
        });

        it("100 USD equals 100 USD", () => {
            const money1 = new Money(100, new Currency('USD'));
            const money2 = new Money(100, new Currency('USD'));

            expect(money1.equals(money2)).to.be.equal(true);
        });

        it("100 USD not equals 200 USD", () => {
            const money1 = new Money(100, new Currency('USD'));
            const money2 = new Money(200, new Currency('USD'));

            expect(money1.equals(money2)).to.be.equal(false);
        });

        it("100 USD not equals 100 EUR", () => {
            const money1 = new Money(100, new Currency('USD'));
            const money2 = new Money(100, new Currency('EUR'));

            expect(money1.equals(money2)).to.be.equal(false);
        });
    });

});
