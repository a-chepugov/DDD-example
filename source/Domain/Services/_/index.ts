import {Service} from "DDD-Core";

export default interface IService extends Service {
    action(id: string): number
}
