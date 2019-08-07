// import {Event, Channel, Subscriber} from "DDD-Core/PubSub";
//
// export class EventNumber extends Event<number> {
//     readonly payload: number;
//
//     constructor(payload: number) {
//         super(payload)
//         // this.payload = payload;
//     }
// }
//
// export class SubscriberEventNumber implements Subscriber<EventNumber> {
//     private readonly _handler: Function;
//
//     constructor(handler: Function) {
//         this._handler = handler;
//     }
//
//     handle(event: EventNumber) {
//         return this._handler(event);
//     }
// }
//
// export class ChannelEventNumber implements Channel<EventNumber, SubscriberEventNumber> {
//     private readonly subscribers: Set<SubscriberEventNumber>;
//
//     constructor() {
//         this.subscribers = new Set();
//     }
//
//     subscribe(subscriber: SubscriberEventNumber): ChannelEventNumber {
//         this.subscribers.add(subscriber);
//         return this;
//     };
//
//     unsubscribe(subscriber: SubscriberEventNumber): ChannelEventNumber {
//         this.subscribers.delete(subscriber);
//         return this;
//     };
//
//     publish(event: EventNumber): ChannelEventNumber {
//         this.subscribers
//             .forEach((subscriber) => setTimeout(() => subscriber.handle(event)));
//
//         return this;
//     };
// }
