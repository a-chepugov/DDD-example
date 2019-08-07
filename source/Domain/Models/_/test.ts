import {expect} from "chai";

import StringId from "../StringId";
import Testee from "./index";

describe("Models", () => {

    describe("_", () => {

        it("id", () => {
            const stringId = new StringId('12345');
            const instance = new Testee(stringId);
            expect(instance).to.instanceOf(Testee);
            expect(instance.id()).to.equal(stringId);
        });

    });

});
