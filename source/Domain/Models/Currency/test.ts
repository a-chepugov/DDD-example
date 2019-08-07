import {expect} from "chai";

import Testee from "./index";

describe("Models", () => {

    describe("Currency", () => {

        it("code", () => {
            const currency1 = new Testee('USD');
            const currency2 = new Testee('USD');

            expect(currency1.code).to.be.equal(currency2.code);
        });

        it("default", () => {
            const currency = Testee.default();
            expect(currency.code).to.be.deep.equal('USD');
        });

        it("USD equals USD", () => {
            const currency1 = new Testee('USD');
            const currency2 = new Testee('USD');

            expect(currency1.equals(currency2)).to.be.equal(true);
        });

        it("USD not equals EUR", () => {
            const currency1 = new Testee('USD');
            const currency2 = new Testee('EUR');

            expect(currency1.equals(currency2)).to.be.equal(false);
        });
    });

});
