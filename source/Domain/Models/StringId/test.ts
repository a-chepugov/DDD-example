import {expect} from "chai";

import StringId from "./index";

describe("Models", () => {

    describe("StringId", () => {

        it("new", () => {
            const stringId = new StringId('value');
            expect(stringId.value).to.be.equal('value');
        });

        it("default", () => {
            const stringId = StringId.default();
            expect(stringId.value).to.be.equal('');
        });
    });

});
