import { Size } from './size';
import { Point } from './point';

export class Printable {
    private _image: HTMLImageElement;
    private _size: Size;
    private _position: Point;

    constructor(_image: HTMLImageElement = null, _size: Size = null, _position: Point = null) {
        this.image = _image;
        this.size = _size;
        this.position = _position;
    }

    public set  image(_image: HTMLImageElement) {
        this._image = _image;
    }

    public set  size(_size: Size) {
        this._size = _size;
    }

    public set  position(_position: Point) {
        this._position = _position;
    }

    public get image() {
        return this._image;
    }

    public get size() {
        return this._size;
    }

    public get position() {
        return this._position;
    }
}
