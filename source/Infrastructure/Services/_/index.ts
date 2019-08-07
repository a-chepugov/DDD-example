import IService from "../../../Domain/Services/_";

export default class Service implements IService {
    action(id: string): number {
        return Number(id);
    }
}
