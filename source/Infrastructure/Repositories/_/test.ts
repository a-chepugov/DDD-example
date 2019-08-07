import {expect} from "chai";
import StringId from "../../../Domain/Models/StringId";
import Model from "../../../Domain/Models/_";
import Repository from "./index";

const mock = [
    {id: 'qwerty', name: 'instance1'},
    {id: 'asdfgh', name: 'instance2'},
    {id: 'zxcvbn', name: 'instance3'},
];

describe("Repositories", () => {

    describe("_", () => {

        const repository = new Repository(mock);

        it("fetch existing entry", () => {
            const stringId = new StringId('asdfgh');
            const instance = repository.read(stringId);
            if (instance) {
                expect(instance).to.instanceOf(Model);
                expect(instance.name).to.be.equal('instance2');
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
            const stringId1 = new StringId('asdfgh');
            const stringId2 = new StringId('zxcvbn');

            const result: Iterable<Model> = repository.browse([stringId1, stringId2]);

            expect(Array.from(result).length).to.be.equal(2);
        });

    });

});
