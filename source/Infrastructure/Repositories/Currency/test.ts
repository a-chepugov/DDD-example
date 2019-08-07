import {expect} from "chai";
import StringId from "../../../Domain/Models/StringId";
import Model from "../../../Domain/Models/Currency";
import Repository from "./index";

const mock = [
    {code: 'USD'},
    {code: 'EUR'},
    {code: 'JPY'},
];

describe("Repositories", () => {

    describe("Currency", () => {

        const repository = new Repository(mock);

        it("fetch existing entry", () => {
            const stringId = new StringId('USD');
            const instance = repository.read(stringId);
            if (instance) {
                expect(instance).to.instanceOf(Model);
                expect(instance.code).to.be.equal('USD');
            } else {
                throw new Error('');
            }
        });

        it("fetch nonexisting entry", () => {
            const stringId = new StringId('');
            const instance = repository.read(stringId);
            if (instance) {
                throw new Error('');
            } else {
                expect(instance).to.be.equal(undefined);
            }
        });

        it("search entities in database", () => {
            const stringId1 = new StringId('USD');
            const stringId2 = new StringId('EUR');

            const result: Iterable<Model> = repository.browse([stringId1, stringId2]);

            expect(Array.from(result).length).to.be.equal(2);
        });

    });

});
