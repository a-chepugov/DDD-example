import {Repository} from "DDD-Core";
import Model from "../../Models/_";
import StringId from "../../Models/StringId";

export default interface IRepositoryForModel extends Repository<Model> {
    browse(...args: any[]): Iterable<Model>;

    read(id: StringId): Model | undefined
}
