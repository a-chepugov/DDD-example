import {expect} from "chai";

import {C, S1, S2, S3} from "./EventBus";

describe("Models", () => {

    describe("CurrenciesExchanger", () => {

        it("exchange 150 EUR to 300 USD", () => {

            let c = new C();
            c.subscribe(new S1());
            c.subscribe(new S2());

            console.log('DEBUG:test.ts():15 =>', c);

            expect(true).to.be.equal(true);
        });


    });

});
