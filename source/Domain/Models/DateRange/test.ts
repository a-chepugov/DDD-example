import {expect} from "chai";

import testee from "./index";

describe("Models", () => {

    describe("DateRange", () => {

        it("create", () => {
            expect(new testee(new Date(0), new Date(1))).to.instanceOf(testee);
        });

        it("default instance", () => {
            expect(testee.default()).to.instanceOf(testee);
        });

        it("duration between start and end", () => {
            expect((new testee(new Date(0), new Date(3)).duration)).to.be.equal(3);
        });

        it("overlaps", () => {
            {
                const instance1 = new testee(new Date(100), new Date(300));
                const instance2 = new testee(new Date(150), new Date(400));
                expect(instance1.overlaps(instance2)).to.be.equal(true);
            }
            {
                const instance1 = new testee(new Date(100), new Date(300));
                const instance2 = new testee(new Date(50), new Date(150));
                expect(instance1.overlaps(instance2)).to.be.equal(true);
            }
            {
                const instance1 = new testee(new Date(100), new Date(300));
                const instance2 = new testee(new Date(0), new Date(400));
                expect(instance1.overlaps(instance2)).to.be.equal(true);
            }
            {
                const instance1 = new testee(new Date(100), new Date(300));
                const instance2 = new testee(new Date(150), new Date(200));
                expect(instance1.overlaps(instance2)).to.be.equal(true);
            }

        });

        it("doesn't overlap", () => {
            {
                const instance1 = new testee(new Date(100), new Date(300));
                const instance2 = new testee(new Date(400), new Date(500));
                expect(instance1.overlaps(instance2)).to.be.equal(false);
            }

            {
                const instance1 = new testee(new Date(100), new Date(300));
                const instance2 = new testee(new Date(0), new Date(50));
                expect(instance1.overlaps(instance2)).to.be.equal(false);
            }
        });
    });

});
