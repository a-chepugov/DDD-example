import {Event} from "DDD-Core";

export default class EventNumber implements Event<number> {
    public readonly timestamp: number;
    public readonly payload: number;

    constructor(payload: number) {
        this.timestamp = Date.now();
        this.payload = payload;
    }
}
