import {ValueObject} from "DDD-Core";

export default class DateTimeRange implements ValueObject<DateTimeRange> {
    public readonly start: Date;
    public readonly end: Date;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    get duration(): number {
        return this.end.getTime() - this.start.getTime();
    }

    newStart(start: Date): DateTimeRange {
        return new DateTimeRange(start, this.end);
    }

    newEnd(end: Date): DateTimeRange {
        return new DateTimeRange(this.start, end);
    }

    add(other: DateTimeRange): DateTimeRange | never {
        if (this.end === other.start) {
            return new DateTimeRange(this.start, other.end);
        } else {
            throw new Error('Not adjacent intervals');
        }
    }

    overlaps(other: DateTimeRange): boolean {
        return (this.start < other.end) && (this.end > other.start);
    }

    equals(other: DateTimeRange): boolean {
        return Boolean(
            (this === other) ||
            ((this.start === other.start) && (this.end === other.end))
        );
    };

    static default(): DateTimeRange {
        return new DateTimeRange(new Date(0), new Date());
    }
}
