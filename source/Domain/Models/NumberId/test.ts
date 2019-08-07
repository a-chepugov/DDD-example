import {expect} from "chai";

import Testee from "./index";

describe("Models", () => {

    describe("NumberId", () => {

        it("new", () => {
            const testee = new Testee(123);
            expect(testee.value).to.be.equal(123);
        });

        it("default", () => {
            const testee = Testee.default();
            expect(testee.value).to.be.equal(0);
        });
    });

});
