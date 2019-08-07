import {expect} from "chai";

import Testee from "./index";

describe("Events", () => {

    describe("_", () => {

        it("new", () => {
            const event = new Testee(5);

            expect(event.payload).to.be.equal(5);
        });

    });

});
