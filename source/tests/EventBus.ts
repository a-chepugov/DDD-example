import {PubSub, ExtractGeneric} from "DDD-Core";

class E implements PubSub.Event {
    readonly payload: number;
    readonly timestamp: number;

    constructor(payload: number) {
        this.payload = payload;
        this.timestamp = Date.now();
    }
}

interface S extends PubSub.Subscriber<E> {
    handle(payload: E): number
}

export class S1 implements PubSub.Subscriber<number> {
    handle(event: E): number {
        return event.payload + 1;
    }
}

export class S2 implements PubSub.Subscriber<number> {
    handle(event: E): number {
        return event.payload + 1;
    }
}

export class S3 implements PubSub.Subscriber<number> {
    handle1(event: E): number {
        return event.payload + 1;
    }
}

export class C implements PubSub.default<S> {
    private subscribers: Set<S>;

    constructor() {
        this.subscribers = new Set();
    }

    subscribe(subscriber: S): any {
        type qwe = ExtractGeneric<number>;
        console.log('DEBUG:EventBus.ts(subscribe):44 =>', Object.getPrototypeOf(subscriber));

        this.subscribers.add(subscriber);
    };

    unsubscribe(subscriber: S): any {
    };

    publish(event: E): any {
        this.subscribers.forEach((subscriber) => {
            subscriber.handle(event)
        });
    };
}
