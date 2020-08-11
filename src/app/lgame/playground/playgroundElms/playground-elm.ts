import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';
import { Printable } from '../../lghelpers/printable';

export class PlaygroundElm {
    private _id: number;
    private _currentPosition: Point;
    private _initialPosition: Point;
    private _initialSize: Size;
    private _type: String;
    private _image: HTMLImageElement;

    constructor(_id: number = 0,
        _position: Point = null,
        _size: Size = null,
        _type: string = "no type",
        _image: HTMLImageElement = null) {
            this.id = _id;
            this.currentPosition = this.initialPosition = _position;
            this.initialSize = _size;
            this.type = _type;
            this.image = _image;
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
        this._initialPosition = value;
    }

    public get initialSize(): Size {
        return this._initialSize;
    }
    public set initialSize(value: Size) {
        this._initialSize = value;
    }

    public get type(): String {
        return this._type;
    }
    public set type(value: String) {
        this._type = value;
    }

    public get image(): HTMLImageElement {
        return this._image;
    }
    public set image(value: HTMLImageElement) {
        this._image = value;
    }

    public objAsPrintable():Printable{
        return new Printable(this.image, this._initialSize, this.currentPosition);
    }
}
