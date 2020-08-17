import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';
import { Printable } from '../../lghelpers/printable';

export class PlaygroundElm {
    private _id: number;
    private _currentPosition: Point;
    private _initialPosition: Point;
    private _initialSize: Size;
    private _currentSize: Size;
    private _type: String;
    private _drawingRequired: boolean;
    private _markForDeletion: boolean;


    constructor(_id: number = 0,
        _position: Point = null,
        _size: Size = null,
        _type: string = "no type") {
            this.id = _id;
            this.initialPosition = _position;
            this.initialSize = _size;
            this.type = _type;
            this.drawingRequired = false;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get currentPosition(): Point {
        return this._currentPosition;
    }
    public set currentPosition(value: Point) {
        this._currentPosition = value;
    }

    public get initialPosition(): Point {
        return this._initialPosition;
    }
    public set initialPosition(value: Point) {
        this.currentPosition = value;
        this._initialPosition = value;
    }

    public get initialSize(): Size {
        return this._initialSize;
    }
    public set initialSize(value: Size) {
        this.currentSize = value;
        this._initialSize = value;
    }
    public get currentSize(): Size {
        return this._currentSize;
    }
    public set currentSize(value: Size) {
        this._currentSize = value;
    }
    public get type(): String {
        return this._type;
    }
    public set type(value: String) {
        this._type = value;
    }
    public get drawingRequired(): boolean {
        return this._drawingRequired;
    }
    public set drawingRequired(value: boolean) {
        this._drawingRequired = value;
    }
    public get markForDeletion(): boolean {
        return this._markForDeletion;
    }
    public set markForDeletion(value: boolean) {
        this._markForDeletion = value;
    }

    centerPosition() {
        return new Point(this.currentPosition.x + this.currentSize.w / 2,
            this.currentPosition.y + this.currentSize.h / 2);
    }
}
