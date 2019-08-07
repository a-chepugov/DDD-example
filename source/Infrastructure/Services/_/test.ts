import {expect} from "chai";

import Service from "./index";

describe("Services", () => {

    describe("_", () => {

        it("new", () => {
            const service = new Service();

            expect(service.action('5')).to.be.equal(5);
        });

    });

});
